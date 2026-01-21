import { UserLayout } from '../components/layout/UserLayout';

export const HistoryPage = () => {
  return (
    <UserLayout>
      <div className="bg-white/5 border border-white/10 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Activity History</h2>
        <p className="text-gray-400">No recent activity found.</p>
      </div>
    </UserLayout>
  );
};
