import { Staff } from '../../models/staff.model';
import { CreateStaffInput, StaffLoginInput } from '@repo/shared';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export class StaffService {
  static async create(storeId: string, data: CreateStaffInput) {
    const passwordHash = await argon2.hash(data.password);

    // Check duplication manually to return clean error?
    // Mongoose index handles it, but catching 11000 in controller is fine.

    const staff = await Staff.create({
      storeId,
      name: data.name,
      staffId: data.staffId,
      passwordHash,
      role: data.role,
    });

    // Don't return passwordHash
    const staffObj = staff.toObject();
    const { passwordHash: _, ...safeStaff } = staffObj;
    return safeStaff;
  }

  static async update(storeId: string, staffId: string, data: Partial<CreateStaffInput>) {
    const updatePayload: any = { ...data };

    if (data.password) {
        updatePayload.passwordHash = await argon2.hash(data.password);
        delete updatePayload.password;
    }

    const staff = await Staff.findOneAndUpdate(
        { _id: staffId, storeId },
        updatePayload,
        { new: true }
    ).select('-passwordHash');

    if (!staff) throw new Error('Staff not found');
    return staff;
  }

  static async delete(storeId: string, staffId: string) {
    const result = await Staff.deleteOne({ _id: staffId, storeId });
    if (result.deletedCount === 0) throw new Error('Staff not found');
    return true;
  }

  static async findByStore(storeId: string) {
    return Staff.find({ storeId }).select('-passwordHash');
  }

  static async login(data: StaffLoginInput) {
    // 1. Resolve Store Short ID (Slug) to _id
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(data.storeId);

    // Dynamic import to avoid circular dependency
    const { Store } = await import('../../models/store.model');
    const store = await Store.findOne(isObjectId ? { _id: data.storeId } : { slug: data.storeId });

    if (!store) {
        throw new Error('Invalid Store ID');
    }

    const staff = await Staff.findOne({
      storeId: store._id,
      staffId: data.staffId
    }).populate('storeId'); // Populate store to return context?

    if (!staff) {
        throw new Error('Invalid credentials');
    }

    if (!staff.isActive) {
        throw new Error('Account inactive');
    }

    const valid = await argon2.verify(staff.passwordHash, data.password);
    if (!valid) {
        throw new Error('Invalid credentials');
    }

    // Generate Token (Special Staff Scope)
    const token = jwt.sign(
      {
        userId: staff._id, // Using standard userId claim
        role: staff.role,
        storeId: staff.storeId._id, // Extra claim
        type: 'staff' // Type discriminator
      },
      JWT_SECRET,
      { expiresIn: '12h' } // POS shifts might be long
    );

    const { passwordHash: _, ...safeStaff } = staff.toObject();

    return {
        accessToken: token,
        staff: safeStaff,
    };
  }
}
