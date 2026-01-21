import { AdminLayout } from '../components/layout/AdminLayout';
import { UserLayout } from '../components/layout/UserLayout';
import { useAuthStore } from '../features/auth/stores/auth.store';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Avatar } from '../components/ui/Avatar';
import { useState } from 'react';
import { toast } from 'sonner';

export const ProfilePage = () => {
  const { user } = useAuthStore();
  const { uploadAvatar, deleteAvatar, updateProfile, changePassword } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const Layout = user?.role === 'admin' ? AdminLayout : UserLayout;

  const handleUpload = async (file: File) => {
      setIsUploading(true);
      try {
          await uploadAvatar(file);
      } finally {
          setIsUploading(false);
      }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
                <Avatar src={user?.avatar} alt={user?.name} size="xl" className={isUploading ? 'opacity-50' : ''} />
                {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                )}
            </div>
            <div className="space-y-3">
               <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{user?.name}</h3>
                  <p className="text-gray-400 capitalize">{user?.role}</p>
               </div>

               <div className="flex space-x-3">
                  <label className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors text-sm font-medium ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {isUploading ? 'Uploading...' : 'Upload Photo'}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        disabled={isUploading}
                        onChange={(e) => {
                           const file = e.target.files?.[0];
                           if (file) handleUpload(file);
                        }}
                      />
                  </label>
                  {user?.avatar && (
                     <button
                        onClick={deleteAvatar}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg transition-colors text-sm font-medium border border-red-500/20"
                     >
                        Remove Photo
                     </button>
                  )}
               </div>
            </div>
          </div>

        </div>

        {/* Edit Profile & Password Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Update Profile */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Edit Profile</h3>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    await updateProfile({
                        name: formData.get('name') as string,
                        email: formData.get('email') as string
                    });
                }} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Name</label>
                        <input name="name" defaultValue={user?.name} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input name="email" defaultValue={user?.email} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full font-medium">
                        Save Changes
                    </button>
                </form>
            </div>

            {/* Change Password */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Change Password</h3>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const newPass = formData.get('newPassword') as string;
                    const confirmPass = formData.get('confirmPassword') as string;

                    if (newPass !== confirmPass) {
                        return toast.error("Passwords don't match");
                    }

                    await changePassword({
                        oldPassword: formData.get('oldPassword') as string,
                        newPassword: newPass
                    });
                    (e.target as HTMLFormElement).reset();
                }} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Current Password</label>
                        <input type="password" name="oldPassword" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">New Password</label>
                        <input type="password" name="newPassword" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
                        <input type="password" name="confirmPassword" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                    </div>
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors w-full font-medium">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
      </div>
    </Layout>
  );
};
