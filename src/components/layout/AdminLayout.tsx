import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, Tags, Settings, LogOut, Box, Building2 } from 'lucide-react';
import { useAuth } from '../admin/AuthProvider';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const linkClass = (path: string) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors border ${
    isActive(path) 
      ? 'bg-white/10 text-white border-white/10' 
      : 'text-cyan-400 hover:text-white hover:bg-white/5 border-transparent'
  }`;

  return (
    <div className="flex h-screen bg-cyan-950 text-cyan-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-cyan-950 text-white flex flex-col hidden md:flex border-r border-white/5">
        <div className="h-24 flex items-center px-6 border-b border-white/5">
          <Link to="/admin">
            <div className="bg-white rounded-xl px-4 py-2 inline-flex shadow-md min-w-[140px] justify-center">
              <img src="/brands/logo-main.jpeg?v=2" alt="Tech Gadget Hut" className="h-10 w-auto object-contain mix-blend-multiply" />
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-4">
            <li>
              <Link to="/admin" className={linkClass('/admin')}>
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/listings" className={linkClass('/admin/listings')}>
                <ShoppingBag className="h-4 w-4" /> Products
              </Link>
            </li>
            <li>
              <Link to="/admin/inventory" className={linkClass('/admin/inventory')}>
                <Box className="h-4 w-4" /> Inventory
              </Link>
            </li>
            <li>
              <Link to="/admin/categories" className={linkClass('/admin/categories')}>
                <Tags className="h-4 w-4" /> Categories
              </Link>
            </li>
            <li>
              <Link to="/admin/brands" className={linkClass('/admin/brands')}>
                <Building2 className="h-4 w-4" /> Brands
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-white/5">
          <ul className="space-y-2">
            <li>
              <Link to="/admin/settings" className={linkClass('/admin/settings')}>
                <Settings className="h-4 w-4" /> Settings
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-cyan-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors border border-transparent text-left"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-cyan-950">
        <header className="h-20 bg-cyan-950 border-b border-white/5 flex items-center px-8 justify-between">
          <h1 className="text-xl font-medium tracking-tight text-white">Administration</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-cyan-400">{user?.name || 'Admin User'}</span>
            <div className="h-10 w-10 bg-cyan-800 text-white rounded-full flex items-center justify-center font-medium">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
