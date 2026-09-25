import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../CartDrawer';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  // Clear search query when not on shop page
  useEffect(() => {
    if (!location.pathname.includes('/shop')) {
      setSearchQuery('');
    } else {
      const params = new URLSearchParams(location.search);
      setSearchQuery(params.get('q') || '');
    }
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/shop`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cyan-950 text-cyan-50 font-sans selection:bg-white/10 selection:text-white">
      <Header />
      
      {/* Global Search Bar */}
      <div className="bg-cyan-900/50 border-b border-white/5 py-6">
        <div className="mx-auto max-w-[1600px] px-2 sm:px-4 lg:px-6">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-cyan-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search premium tech..."
                className="block w-full pl-12 pr-6 py-3 sm:py-4 rounded-full border border-white/10 bg-cyan-950 text-white placeholder:text-cyan-500 focus:outline-none focus:border-cyan-400 text-sm transition-all shadow-xl"
              />
            </div>
            <button type="submit" className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-cyan-500 text-cyan-950 font-semibold hover:bg-cyan-400 transition-colors shadow-xl">
              Search
            </button>
          </form>
        </div>
      </div>

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 sm:p-4 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-7 h-7 sm:w-8 sm:h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
        <span className="absolute right-14 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium mr-2 shadow-lg">
          Chat with us!
        </span>
      </a>
    </div>
  );
}
