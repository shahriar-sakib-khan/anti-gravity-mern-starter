import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/stores/auth.store';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { LayoutDashboard, History, Settings, User, LogOut } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

interface LayoutProps {
  children: ReactNode;
}

export const UserLayout = ({ children }: LayoutProps) => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: History, label: 'History', path: '/history' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            Antigravity
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section: Settings & Profile */}
        <div className="p-4 border-t border-white/10 space-y-2">
            <Link
              to="/settings"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === '/settings'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>

          <div className="pt-2 flex items-center justify-between px-4 pb-2 text-gray-400">
             <div className="flex items-center space-x-2 cursor-pointer hover:text-white" onClick={() => navigate('/profile')}>
                 <Avatar src={user?.avatar} alt={user?.name} size="sm" />
                 <div className="text-sm">
                     <p className="font-medium text-white">{user?.name}</p>
                 </div>
             </div>
             <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-400 p-2 rounded-full hover:bg-white/5 transition-colors"
                title="Logout"
             >
                <LogOut size={18} />
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar (Simplified for User) */}
        <header className="h-16 bg-white/5 border-b border-white/10 flex items-center px-8">
          <h2 className="text-lg font-medium text-gray-300">
            {location.pathname.replace('/', '').replace(/-/g, ' ').toUpperCase()}
          </h2>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
