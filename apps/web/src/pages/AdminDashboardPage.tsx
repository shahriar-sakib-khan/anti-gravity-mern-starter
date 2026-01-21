import { useAuthStore } from '../features/auth/stores/auth.store';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../components/layout/AdminLayout';
import { useUsers } from '../features/users/hooks/useUsers';
import { Shield, ShieldOff, User as UserIcon, Trash2 } from 'lucide-react';

import { Modal } from '../components/ui/Modal';
import { useState } from 'react';

export const AdminDashboardPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { users, isLoading, fetchUsers, updateUserRole, deleteUser } = useUsers();
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate('/dashboard');
    } else {
        fetchUsers();
    }
  }, [user, navigate, fetchUsers]);

  if (!user || user.role !== 'admin') return null;

  const adminUsers = users.filter(u => u.role === 'admin');
  const normalUsers = users.filter(u => u.role === 'user');

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            System Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admin Users List */}
          <div className="bg-gray-900 border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Shield className="mr-2 text-purple-400" /> Admins ({adminUsers.length})
            </h2>
            <div className="space-y-4">
                {adminUsers.map(admin => (
                    <div
                        key={admin._id}
                        className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                        onClick={() => navigate(`/admin/users/${admin._id}`)}
                    >
                        <div>
                            <p className="font-medium text-white">{admin.name}</p>
                            <p className="text-sm text-gray-400">{admin.email}</p>
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>
                        {admin._id !== user.id && ( // Prevent demoting self
                             <button
                                onClick={() => updateUserRole(admin._id, 'user')}
                                className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1 rounded transition-colors"
                             >
                                Demote to User
                             </button>
                        )}
                        </div>
                         {admin._id === user.id && (
                             <span className="text-xs text-gray-500 italic">You</span>
                        )}
                    </div>
                ))}
            </div>
          </div>

          {/* Normal Users List */}
          <div className="bg-gray-900 border border-white/5 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <UserIcon className="mr-2 text-blue-400" /> Users ({normalUsers.length})
            </h2>
            {isLoading && <p className="text-gray-400">Loading users...</p>}
            <div className="space-y-4">
                {normalUsers.map(normalUser => (
                    <div
                        key={normalUser._id}
                        className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                        onClick={() => navigate(`/admin/users/${normalUser._id}`)}
                    >
                        <div>
                            <p className="font-medium text-white">{normalUser.name}</p>
                            <p className="text-sm text-gray-400">{normalUser.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                             <button
                                 onClick={(e) => {
                                     e.stopPropagation();
                                     updateUserRole(normalUser._id, 'admin');
                                 }}
                                 className="text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 px-3 py-1 rounded transition-colors"
                             >
                                Promote to Admin
                             </button>
                             <button
                                 onClick={(e) => {
                                     e.stopPropagation();
                                     setUserToDelete(normalUser._id);
                                 }}
                                 className="p-1 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                                 title="Delete User"
                             >
                                <Trash2 size={16} />
                             </button>
                        </div>
                    </div>
                ))}
                {!isLoading && normalUsers.length === 0 && <p className="text-gray-500 text-sm">No normal users found.</p>}
            </div>
          </div>
        </div>

        <Modal
            isOpen={!!userToDelete}
            onClose={() => setUserToDelete(null)}
            title="Delete User?"
        >
            <div className="space-y-4">
                <p className="text-gray-300">
                    Are you absolutely sure you want to delete this user? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={() => setUserToDelete(null)}
                        className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            if (userToDelete) {
                                deleteUser(userToDelete);
                                setUserToDelete(null);
                            }
                        }}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                    >
                        Delete User
                    </button>
                </div>
            </div>
        </Modal>
      </div>
    </AdminLayout>
  );
};
