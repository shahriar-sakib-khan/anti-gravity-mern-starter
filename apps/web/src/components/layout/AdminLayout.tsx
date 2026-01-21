import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/stores/auth.store';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { LayoutDashboard, Settings, User, LogOut, Shield } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

interface LayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: LayoutProps) => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Admin Dashboard', path: '/admin' },
    // No History here as requested
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex border-t-4 border-purple-600">
      {/* Sidebar with distinct Admin look */}
      <aside className="w-64 bg-gray-900 border-r border-white/5 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 flex items-center">
            <Shield className="mr-2 text-purple-500" /> Admin
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section: Settings & Profile */}
        <div className="p-4 border-t border-white/5 space-y-2">
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
                 <Avatar src={user?.avatar} alt={user?.name} size="sm" className="ring-2 ring-purple-500/50" />
                 <div className="text-sm">
                     <p className="font-medium text-white">{user?.name}</p>
                     <p className="text-xs text-purple-400">Administrator</p>
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
      <div className="flex-1 flex flex-col bg-black">
        {/* Topbar */}
        <header className="h-16 border-b border-white/5 flex items-center px-8 bg-gray-900/50">
          <h2 className="text-lg font-medium text-purple-300/80">
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
