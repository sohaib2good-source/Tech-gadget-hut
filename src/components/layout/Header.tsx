import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu, X, MapPin, FileText, ChevronDown } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/shop`);
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-cyan-950/80 backdrop-blur-xl transition-all duration-300">
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'h-16 sm:h-20' : 'h-20'}`}>
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className={`bg-white rounded-xl flex items-center justify-center shadow-md transition-all duration-300 ${isScrolled ? 'px-3 py-1 min-w-[110px] sm:px-4 sm:py-1.5 sm:min-w-[140px]' : 'px-4 py-1.5 min-w-[140px]'}`}>
                <img src="/brands/logo-main.jpeg?v=2" alt="Tech Gadget Hut" className={`w-auto object-contain mix-blend-multiply transition-all duration-300 ${isScrolled ? 'h-8 sm:h-12' : 'h-12'}`} />
              </div>
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-cyan-400 hover:text-white transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-cyan-400">
            <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
            <Link to="/shop" className="hover:text-white transition-colors">Categories</Link>
            <Link to="/shop?condition=New" className="hover:text-white transition-colors">New Arrivals</Link>
            <Link to="/shop" className="hover:text-white transition-colors">Deals</Link>
          </nav>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search laptops, phones, brands..."
                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-2.5 pl-11 text-sm text-white placeholder:text-cyan-500 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
              />
              <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search className="h-4 w-4 text-cyan-500" />
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-cyan-400 hover:text-white transition-colors lg:hidden">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-cyan-400 hover:text-white transition-colors hidden sm:block">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-2 text-cyan-400 hover:text-white transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 z-[70] w-[300px] bg-white transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Blue Section */}
        <div className="bg-[#42a5f5] text-white p-6 pb-8 relative flex-shrink-0">
          <button 
            onClick={closeSidebar}
            className="absolute top-4 right-4 p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 mb-6 mt-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#42a5f5] font-bold text-xl">
              T
            </div>
            <span className="text-xl font-bold tracking-tight">TechGadget</span>
          </div>

          <button className="w-32 bg-white text-[#42a5f5] font-semibold py-2 rounded mb-6 text-sm hover:bg-gray-50 transition-colors shadow-sm">
            Login
          </button>

          <nav className="flex flex-col gap-4 text-sm font-medium">
            <Link to="#" className="flex items-center gap-3 hover:text-white/80 transition-colors">
              <MapPin className="w-5 h-5" />
              Track my Order
            </Link>
            <Link to="#" className="flex items-center gap-3 hover:text-white/80 transition-colors">
              <FileText className="w-5 h-5" />
              Launch a Complaint
            </Link>
          </nav>
        </div>

        {/* Bottom White Section - Categories */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-xs font-semibold text-gray-400 mb-4 tracking-wider">CATEGORIES</h3>
            <nav className="flex flex-col space-y-1">
              {[
                { name: 'Mobiles', icon: '📱', brands: ['Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus'] },
                { name: 'Smart Watches', icon: '⌚', brands: ['Apple Watch', 'Samsung', 'Garmin', 'Fitbit'] },
                { name: 'Wireless Earbuds', icon: '🎧', brands: ['Apple', 'Sony', 'Jabra', 'Samsung', 'Bose'] },
                { name: 'Air Purifiers', icon: '💨', brands: ['Xiaomi', 'Dyson', 'Philips', 'Coway'] },
                { name: 'Personal Cares', icon: '💆', brands: ['Philips', 'Braun', 'Panasonic', 'Remington'] },
              ].map((cat, index, arr) => (
                <div key={cat.name} className={`flex flex-col ${index !== arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <button 
                    onClick={(e) => {
                      const expanded = document.getElementById(`cat-${cat.name}`);
                      const icon = document.getElementById(`icon-${cat.name}`);
                      if (expanded) {
                        expanded.classList.toggle('hidden');
                        icon?.classList.toggle('rotate-180');
                      }
                    }}
                    className="flex items-center justify-between py-3 text-gray-600 hover:text-[#42a5f5] hover:bg-gray-50 px-2 rounded-lg transition-colors w-full"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-sm font-medium">{cat.name}</span>
                    </div>
                    <ChevronDown id={`icon-${cat.name}`} className="w-4 h-4 text-gray-400 transition-transform duration-200" />
                  </button>
                  <div id={`cat-${cat.name}`} className="hidden pl-11 pr-4 py-2 flex-col gap-3">
                    {cat.brands.map(brand => (
                      <Link 
                        key={brand}
                        to={`/shop?q=${encodeURIComponent(cat.name)}&brand=${encodeURIComponent(brand.toLowerCase())}`}
                        onClick={closeSidebar}
                        className="text-sm text-gray-500 hover:text-[#42a5f5] transition-colors block"
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Popular Lists Section */}
          <div className="px-6 pb-8">
            <h3 className="text-xs font-semibold text-[#42a5f5] mb-4 tracking-wider uppercase">Popular Lists</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Best Mobiles Under 10000', maxPrice: 10000 },
                { label: 'Best Mobiles Under 15000', maxPrice: 15000 },
                { label: 'Best Mobiles Under 20000', maxPrice: 20000 },
                { label: 'Best Mobiles Under 30000', maxPrice: 30000 },
                { label: 'Best Mobiles Under 40000', maxPrice: 40000 },
                { label: 'Best Mobiles Under 50000', maxPrice: 50000 },
                { label: 'Best Mobiles Under 60000', maxPrice: 60000 },
                { label: 'Best Mobiles Under 80000', maxPrice: 80000 },
                { label: 'Best Mobiles Under 100000', maxPrice: 100000 },
                { label: 'Best 5G Phones', q: '5g' },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.maxPrice ? `/shop?category=mobile-phones&maxPrice=${item.maxPrice}` : `/shop?q=${item.q}`}
                  onClick={closeSidebar}
                  className="inline-flex w-fit px-4 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:border-[#42a5f5] hover:text-[#42a5f5] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
