import { useAuthStore } from '../features/auth/stores/auth.store';
import { useAuth } from '../features/auth/hooks/useAuth';
import { AdminLayout } from '../components/layout/AdminLayout';
import { UserLayout } from '../components/layout/UserLayout';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '../components/ui/Modal';

export const SettingsPage = () => {
  const { user } = useAuthStore();
  const { deleteAccount } = useAuth();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!user) return null;
  const Layout = user.role === 'admin' ? AdminLayout : UserLayout;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white">Settings</h1>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Account Preferences</h2>
            <p className="text-gray-400">General settings will go here (Notifications, Theme, etc).</p>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-8">
            <h2 className="text-xl font-bold text-red-500 mb-4 flex items-center">
                <Trash2 className="mr-2" /> Danger Zone
            </h2>
            <p className="text-gray-400 mb-6">
                Permanently delete your account and all of your content. This action cannot be undone.
            </p>
            <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
            >
                Delete Account
            </button>
        </div>

        <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Delete Account?"
        >
            <div className="space-y-4">
                <p className="text-gray-300">
                    Are you absolutely sure you want to delete your account? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            deleteAccount();
                            setIsDeleteModalOpen(false);
                        }}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                    >
                        Confirm Delete
                    </button>
                </div>
            </div>
        </Modal>
      </div>
    </Layout>
  );
};
