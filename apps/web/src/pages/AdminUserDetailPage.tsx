import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers, User } from '../features/users/hooks/useUsers';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Avatar } from '../components/ui/Avatar';
import { ArrowLeft, Shield, Mail, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '../components/ui/Modal';

export const AdminUserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserById, adminResetPassword, deleteUser } = useUsers();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
       getUserById(id)
         .then(setUser)
         .catch(() => toast.error("Failed to load user"))
         .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return (
      <AdminLayout>
          <div className="flex h-[50vh] items-center justify-center text-gray-400">
              Loading...
          </div>
      </AdminLayout>
  );

  if (!user) return (
      <AdminLayout>
          <div className="text-center py-20 text-gray-400">
              User not found
          </div>
      </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <button
            onClick={() => navigate('/admin')}
            className="flex items-center text-gray-400 hover:text-white transition-colors mb-4"
        >
            <ArrowLeft size={20} className="mr-2" /> Back to Users
        </button>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-6">
                    <Avatar src={user.avatar} alt={user.name} size="xl" />
                    <div>
                        <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                        <p className="text-gray-400 flex items-center mt-1">
                            <Mail size={16} className="mr-2" /> {user.email}
                        </p>
                        <div className="flex items-center mt-3 space-x-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                user.role === 'admin'
                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            } uppercase tracking-wider`}>
                                {user.role}
                            </span>
                            <span className="text-gray-500 text-xs font-mono bg-black/20 px-2 py-1 rounded">
                                ID: {user._id}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Reset Password Zone */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Shield className="mr-3 text-red-400" /> Admin Danger Zone
            </h3>
            <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-6">
                <h4 className="text-lg font-medium text-red-100 mb-2">Force Password Reset</h4>
                <p className="text-sm text-red-200/60 mb-6">
                    This will immediately override the users current password. They will need to use this new password to login.
                </p>

                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const newPass = formData.get('newPassword') as string;
                    if (!newPass) return;

                    try {
                        await adminResetPassword(user._id, newPass);
                        toast.success("Password reset successfully");
                        (e.target as HTMLFormElement).reset();
                    } catch {
                        toast.error("Failed to reset password");
                    }
                }} className="flex items-end gap-4">
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-red-200/60 mb-1.5 uppercase tracking-wide">New Permanent Password</label>
                        <input
                            name="newPassword"
                            type="text"
                            placeholder="Enter new password..."
                            className="w-full bg-black/20 border border-red-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 placeholder-red-500/20 font-mono"
                        />
                    </div>
                    <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
};
