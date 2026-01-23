import { Store } from '../../models/store.model';
import { CreateStoreInput, UpdateStoreInput } from '@repo/shared';

export class StoreService {
  static async create(ownerId: string, data: CreateStoreInput) {
    // Generate unique 6-char ID
    const generateId = () => Math.random().toString(36).substring(2, 8).toUpperCase();
    let slug = data.slug || generateId();

    // Simple collision check (optional loop)
    while (await Store.findOne({ slug })) {
        slug = generateId();
    }

    const store = await Store.create({
      ...data,
      slug,
      ownerId,
    });
    return store;
  }

  static async findByOwner(ownerId: string) {
    return Store.find({ ownerId });
  }

  static async findOne(storeId: string, ownerId: string) {
    const store = await Store.findOne({ _id: storeId, ownerId });
    if (!store) {
      throw new Error('Store not found'); // Handled by controller or global error handler
    }
    return store;
  }

  static async update(storeId: string, ownerId: string, data: UpdateStoreInput) {
    const store = await Store.findOneAndUpdate(
      { _id: storeId, ownerId },
      { $set: data },
      { new: true }
    );
    if (!store) {
      throw new Error('Store not found');
    }
    return store;
  }

  static async delete(storeId: string, ownerId: string) {
    const result = await Store.deleteOne({ _id: storeId, ownerId });
    if (result.deletedCount === 0) {
      throw new Error('Store not found');
    }
    return true;
  }
}
