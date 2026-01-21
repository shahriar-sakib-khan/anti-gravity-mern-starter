import { UserLayout } from '../components/layout/UserLayout';
import { useAuthStore } from '../features/auth/stores/auth.store';

export const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <UserLayout>
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-gray-400">
            This is your dashboard. Access history and settings from the sidebar.
          </p>
          <div className="mt-4 p-4 bg-black/50 rounded border border-white/10 font-mono text-sm text-green-400 inline-block">
             {JSON.stringify(user, null, 2)}
          </div>
        </div>
    </UserLayout>
  );
};
