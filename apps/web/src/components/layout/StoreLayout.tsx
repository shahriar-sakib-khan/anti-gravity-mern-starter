import { ReactNode } from 'react';
import { Link, useLocation, useNavigate, useParams, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/stores/auth.store';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { LayoutDashboard, Settings, User, LogOut, ArrowLeft, Package, Users, ShoppingCart } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/button';
import { useStore } from '../../features/store/hooks/useStores';

interface LayoutProps {
  children?: ReactNode;
}

export const StoreLayout = ({ children }: LayoutProps) => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Fetch store details to show name in sidebar
  const { data: storeData } = useStore(id || '');
  const store = storeData?.store;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: `/stores/${id}/dashboard` },
    { icon: Package, label: 'Products', path: `/stores/${id}/products` },
    { icon: ShoppingCart, label: 'Orders', path: `/stores/${id}/orders` },
    { icon: Users, label: 'Staff', path: `/stores/${id}/staff` },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Store Brand / Switcher */}
        <div className="p-6 border-b border-border">
           <Link to="/stores" className="flex items-center text-xs text-muted-foreground hover:text-primary mb-4 transition-colors">
              <ArrowLeft size={14} className="mr-1" />
              Back to Portal
           </Link>
           {store ? (
               <div>
                   <h2 className="text-xl font-bold text-foreground truncate">{store.name}</h2>
                   <p className="text-xs text-muted-foreground font-mono truncate">{store.slug}</p>
               </div>
           ) : (
               <div className="animate-pulse h-8 bg-muted rounded w-3/4"></div>
           )}
        </div>

        <nav className="flex-1 px-4 space-y-2 py-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? 'bg-primary/10 text-primary shadow-sm border border-primary/20'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section: Settings & Profile */}
        <div className="p-4 border-t border-border space-y-2">
            <Link
              to={`/stores/${id}/settings`}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname.includes('/settings')
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Settings size={20} />
              <span>Store Settings</span>
            </Link>

          <div className="pt-2 flex items-center justify-between px-4 pb-2 text-muted-foreground">
             <div className="flex items-center space-x-2 cursor-pointer hover:text-foreground" onClick={() => navigate('/profile')}>
                 <Avatar src={user?.avatar} alt={user?.name} size="sm" />
                 <div className="text-sm">
                     <p className="font-medium text-foreground">{user?.name}</p>
                 </div>
             </div>
             <Button
                onClick={handleLogout}
                variant="ghost"
                size="icon"
                className="text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10"
                title="Logout"
             >
                <LogOut size={18} />
             </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar (Breadcrumbs / Title) */}
        <header className="h-16 bg-card border-b border-border flex items-center px-8 shadow-sm">
           <h2 className="text-lg font-medium text-card-foreground">
            {menuItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
          </h2>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto bg-background">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
