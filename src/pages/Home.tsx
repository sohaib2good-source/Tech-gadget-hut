import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Tag, Zap } from 'lucide-react';

const CarouselSection = ({ title, listings, id }: any) => {
  if (!listings || listings.length === 0) return null;
  
  const isHotDeals = title.includes("Hot Deals");
  const isBestSellers = title.includes("Best Sellers");
  const isLimited = title.includes("Limited Edition");
  
  let accentColor = "from-cyan-400 to-blue-500";
  let glowColor = "bg-cyan-500/20";
  let badgeColors = "bg-cyan-400 text-cyan-950 shadow-[0_0_15px_rgba(34,211,238,0.6)]";
  let textAccent = "text-cyan-400";
  let hoverBorder = "hover:border-cyan-400";
  let cardGlow = "hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)]";
  
  if (isHotDeals) {
    accentColor = "from-rose-400 to-orange-500";
    glowColor = "bg-rose-500/20";
    badgeColors = "bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)]";
    textAccent = "text-rose-400";
    hoverBorder = "hover:border-rose-400";
    cardGlow = "hover:shadow-[0_0_40px_-10px_rgba(244,63,94,0.5)]";
  } else if (isBestSellers) {
    accentColor = "from-amber-300 to-yellow-500";
    glowColor = "bg-amber-500/20";
    badgeColors = "bg-amber-400 text-amber-950 shadow-[0_0_15px_rgba(251,191,36,0.6)]";
    textAccent = "text-amber-400";
    hoverBorder = "hover:border-amber-400";
    cardGlow = "hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.5)]";
  } else if (isLimited) {
    accentColor = "from-purple-400 to-fuchsia-600";
    glowColor = "bg-purple-500/20";
    badgeColors = "bg-fuchsia-400 text-fuchsia-950 shadow-[0_0_15px_rgba(232,121,249,0.6)]";
    textAccent = "text-fuchsia-400";
    hoverBorder = "hover:border-fuchsia-400";
    cardGlow = "hover:shadow-[0_0_40px_-10px_rgba(232,121,249,0.5)]";
  }

  return (
    <section className="py-24 relative overflow-hidden bg-[#070b14] border-b border-white/[0.05]">
      <div className={`absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] max-w-5xl h-[400px] pointer-events-none blur-[140px] opacity-70 ${glowColor}`} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_100%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 relative">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className={`h-[3px] w-12 bg-gradient-to-r ${accentColor} rounded-full shadow-[0_0_10px_currentColor] ${textAccent}`} />
              <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${textAccent}`}>Curated Collection</span>
            </div>
            <h2 className={`text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${accentColor}`}>{title}</h2>
          </div>
          <Link to={`/shop?q=${encodeURIComponent(title.replace(/[🔥🏆✨]/g, '').trim())}`} className="hidden sm:flex items-center gap-2 px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all group backdrop-blur-md shadow-xl hover:scale-105">
            Explore All 
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="relative group mt-8">
          <button
            onClick={() => {
              const container = document.getElementById(id);
              if (container) container.scrollBy({ left: -350, behavior: 'smooth' });
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all hidden sm:block shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:scale-110"
          >
            <ArrowRight className="h-6 w-6 rotate-180" />
          </button>

          <div
            id={id}
            className="grid grid-cols-2 gap-4 sm:flex sm:overflow-x-auto sm:gap-8 pb-12 pt-4 sm:snap-x sm:snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {listings.map((listing: any, index: number) => (
              <Link 
                key={listing.id} 
                to={`/product/${listing.slug}`} 
                className={`${index >= 4 ? 'hidden sm:flex' : 'flex'} flex-col sm:snap-start sm:flex-shrink-0 w-full sm:w-[340px] group bg-white/5 backdrop-blur-3xl rounded-[2rem] border border-white/10 ${hoverBorder} transition-all duration-500 hover:-translate-y-4 ${cardGlow} overflow-hidden`}
              >
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-black/50 p-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent z-10" />
                  <img src={listing.imageUrl || 'https://images.unsplash.com/photo-1550009158-9ebf6d173153?auto=format&fit=crop&q=80&w=500'} alt={listing.title} className="w-full h-full object-contain filter drop-shadow-2xl opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 relative z-0" />
                  
                  <div className="absolute top-4 left-4 z-20">
                    <div className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest ${badgeColors}`}>
                      {listing.condition}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow relative bg-gradient-to-b from-[#070b14]/50 to-[#070b14]">
                  <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <span className="text-[11px] font-bold text-white/50 uppercase tracking-[0.2em] mb-3">{listing.category}</span>
                  <h3 className="text-xl font-bold text-white leading-snug mb-6 line-clamp-2 group-hover:text-white transition-colors">{listing.title}</h3>
                  
                  <div className="mt-auto pt-6 flex items-end justify-between border-t border-white/10">
                    <div className="flex flex-col gap-1">
                      {listing.originalPrice && (
                        <span className="text-sm font-semibold text-white/40 line-through decoration-white/30">Rs. {listing.originalPrice.toLocaleString()}</span>
                      )}
                      <span className={`text-2xl font-black ${textAccent}`}>Rs. {listing.price.toLocaleString()}</span>
                    </div>
                    
                    <div className={`h-12 w-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors shadow-lg`}>
                      <ArrowRight className={`h-5 w-5 ${textAccent} -rotate-45 group-hover:rotate-0 transition-transform duration-300`} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => {
              const container = document.getElementById(id);
              if (container) container.scrollBy({ left: 350, behavior: 'smooth' });
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all hidden sm:block shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:scale-110"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

const SmoothVideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(1);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      // Fade out in the last 0.3 seconds to hide jump cut
      if (duration > 0 && duration - currentTime < 0.3) {
        setOpacity(0);
      } else if (currentTime < 0.3) {
        setOpacity(0);
        setTimeout(() => setOpacity(1), 50);
      } else {
        setOpacity(1);
      }
    }
  };

  return (
    <video 
      ref={videoRef}
      autoPlay 
      loop 
      muted 
      playsInline 
      onTimeUpdate={handleTimeUpdate}
      style={{ opacity, transition: 'opacity 0.6s ease-in-out' }}
      className="absolute inset-0 w-full h-full object-cover brightness-[1.3] scale-[1.15] origin-top-left"
    >
      <source src="/brands/Drone_filming_building_20260924003857.mp4" type="video/mp4" />
    </video>
  );
};

const BrandTicker = () => {
  const brands = [
    { id: 'samsung', name: 'SAMSUNG' }, { id: 'apple', name: 'Apple' }, { id: 'lenovo', name: 'Lenovo' },
    { id: 'vivo', name: 'vivo' }, { id: 'anker', name: 'ANKER' }, { id: 'jbl', name: 'JBL' },
    { id: 'sony', name: 'SONY' }, { id: 'dell', name: 'DELL' }, { id: 'hp', name: 'hp' },
    { id: 'oppo', name: 'OPPO' }, { id: 'amazfit', name: 'AMAZFIT' }, { id: 'asus', name: 'ASUS' },
    { id: 'acer', name: 'acer' }, { id: 'lg', name: 'LG' }, { id: 'google', name: 'Google' },
    { id: 'microsoft', name: 'Microsoft' }, { id: 'intel', name: 'intel' }, { id: 'amd', name: 'AMD' },
    { id: 'nokia', name: 'NOKIA' }, { id: 'motorola', name: 'motorola' }, { id: 'xiaomi', name: 'Xiaomi' },
    { id: 'mi', name: 'MI' }, { id: 'huawei', name: 'HUAWEI' }, { id: 'realme', name: 'realme' },
    { id: 'oneplus', name: 'OnePlus' }, { id: 'meizu', name: 'MEIZU' },
    { id: 'tecno', name: 'TECNO' }, { id: 'tcl', name: 'TCL' },
    { id: 'panasonic', name: 'Panasonic' }, { id: 'philips', name: 'PHILIPS' },
    { id: 'bose', name: 'BOSE' }, { id: 'sennheiser', name: 'SENNHEISER' }, { id: 'corsair', name: 'CORSAIR' },
    { id: 'razer', name: 'RAZER' }, { id: 'logitech', name: 'logitech' }, { id: 'steelseries', name: 'steelseries' },
    { id: 'hyperx', name: 'HYPERX' }, { id: 'roccat', name: 'ROCCAT' }, { id: 'beats', name: 'beats' },
    { id: 'skullcandy', name: 'Skullcandy' }, { id: 'jabra', name: 'Jabra' }, { id: 'garmin', name: 'GARMIN' },
    { id: 'fitbit', name: 'fitbit' }, { id: 'gopro', name: 'GoPro' }, { id: 'dji', name: 'DJI' },
    { id: 'canon', name: 'Canon' }, { id: 'nikon', name: 'Nikon' }, { id: 'nintendo', name: 'Nintendo' },
    { id: 'playstation', name: 'PlayStation' }
  ];
  
  return (
    <div className="w-full bg-cyan-950 py-4 overflow-hidden relative flex z-40 border-b border-cyan-900/50">
      <div className="flex w-fit animate-scroll-infinite hover:[animation-play-state:paused]">
        <div className="flex items-center min-w-full justify-around">
          {brands.map((brand, i) => (
            <div key={i} className="flex items-center justify-center gap-2.5 flex-shrink-0 mx-1.5 hover:scale-105 transition-transform duration-300">
              <div className="bg-white/10 p-1.5 rounded-md backdrop-blur-sm border border-white/5">
                <img src={`/brands/${brand.id}.png`} alt={brand.name} className="h-5 w-5 object-contain rounded-sm" />
              </div>
              <span className="text-white/90 font-bold text-sm tracking-wider uppercase font-sans">{brand.name}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center min-w-full justify-around" aria-hidden="true">
          {brands.map((brand, i) => (
            <div key={i} className="flex items-center justify-center gap-2.5 flex-shrink-0 mx-1.5 hover:scale-105 transition-transform duration-300">
              <div className="bg-white/10 p-1.5 rounded-md backdrop-blur-sm border border-white/5">
                <img src={`/brands/${brand.id}.png`} alt={brand.name} className="h-5 w-5 object-contain rounded-sm" />
              </div>
              <span className="text-white/90 font-bold text-sm tracking-wider uppercase font-sans">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [recentListings, setRecentListings] = useState<any[]>([]);
  const [allListings, setAllListings] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));

    fetch('/api/listings/recent')
      .then(res => res.json())
      .then(data => setRecentListings(data));

    fetch('/api/listings')
      .then(res => res.json())
      .then(data => setAllListings(data));

    if (window.location.search.includes('scrollTo=categories')) {
      setTimeout(() => {
        document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const laptops = allListings.filter(l => l.category?.toLowerCase() === 'laptops' || l.category?.toLowerCase().includes('laptop'));
  const mobiles = allListings.filter(l => l.category?.toLowerCase() === 'mobile phones' || l.category?.toLowerCase().includes('mobile'));
  const accessories = allListings.filter(l => {
    const cat = l.category?.toLowerCase() || '';
    return !cat.includes('laptop') && !cat.includes('mobile');
  });

  const newArrivals = allListings.filter(l => l.badge === 'New Arrival');
  const bestSellers = allListings.filter(l => l.badge === 'Best Seller');
  const limitedEdition = allListings.filter(l => l.badge === 'Limited Edition');
  const hotDeals = allListings.filter(l => l.isDeal);
  
  const displayNewArrivals = newArrivals.length > 0 ? newArrivals : recentListings;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/shop`);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Brand Ticker Bar */}
      <BrandTicker />

      {/* Hero Section */}
      <section className="relative bg-cyan-950 text-white pt-6 pb-16 sm:pt-8 sm:pb-24 overflow-hidden border-b border-white/5">
        <SmoothVideoBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/30 via-transparent to-cyan-950/50 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">

          {/* Colorful Overlapping Gadgets Bar */}
          <div className="flex justify-center mb-10 w-full overflow-hidden px-2 sm:px-4">
            <div
              className="flex -space-x-3 sm:-space-x-5 overflow-x-auto pb-8 pt-4 items-center justify-start lg:justify-center snap-x w-full max-w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[
                { name: 'Laptop', url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=200', gradient: 'from-pink-500 to-rose-500' },
                { name: 'Mobile', url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&q=80&w=200', gradient: 'from-purple-500 to-indigo-500' },
                { name: 'Power Bank', url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=200', gradient: 'from-blue-500 to-cyan-400' },
                { name: 'Oculus', url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=200', gradient: 'from-violet-500 to-fuchsia-500' },
                { name: 'Tablet', url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=200', gradient: 'from-red-400 to-pink-500' },
                { name: 'Earbuds', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=200', gradient: 'from-emerald-400 to-teal-500' },
                { name: 'Headphones', url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=200', gradient: 'from-amber-400 to-orange-500' },
                { name: 'Monitor', url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=200', gradient: 'from-indigo-400 to-blue-600' },
                { name: 'Smartwatch', url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=200', gradient: 'from-yellow-400 to-amber-500' },
                { name: 'Keyboard', url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=200', gradient: 'from-green-400 to-emerald-600' },
                { name: 'Mouse', url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=200', gradient: 'from-sky-400 to-cyan-500' },
                { name: 'Camera', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200', gradient: 'from-rose-400 to-red-500' },
                { name: 'Drone', url: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=200', gradient: 'from-orange-400 to-rose-500' },
                { name: 'Mic', url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200', gradient: 'from-teal-400 to-cyan-600' },
                { name: 'Speaker', url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=200', gradient: 'from-indigo-400 to-purple-600' },
              ].map((gadget, i) => (
                <Link
                  to={`/shop?q=${encodeURIComponent(gadget.name)}`}
                  key={gadget.name}
                  style={{ zIndex: i }}
                  className={`relative flex-shrink-0 snap-center w-[64px] h-[64px] sm:w-[92px] sm:h-[92px] rounded-full p-[3px] bg-gradient-to-tr ${gadget.gradient} shadow-2xl hover:z-50 hover:-translate-y-2 hover:scale-110 transition-all duration-300 [&::-webkit-scrollbar]:hidden`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-950 bg-cyan-950">
                    <img src={gadget.url} alt={gadget.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
              ))}
            </div>
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>

          <h1 className="text-4xl sm:text-7xl font-semibold tracking-tight mb-6">
            Premium Tech Gadgets <br className="hidden sm:block" /> Curated For You.
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto mb-10">
            Discover our expertly curated collection of new, used and refurbished laptops, mobiles, gaming gear and premium gadgets.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/shop" className="w-full sm:w-auto rounded-full bg-white px-8 py-4 text-sm font-semibold text-cyan-950 hover:bg-cyan-200 transition-colors">
              Explore Gadgets
            </Link>
          </div>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-cyan-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search laptops, phones, brands, models..."
              className="block w-full pl-12 pr-6 py-4 rounded-full border border-white/10 bg-white/5 text-white placeholder:text-cyan-500 focus:outline-none focus:border-white/20 focus:bg-white/10 text-sm transition-all shadow-2xl"
            />
          </form>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-cyan-950 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-cyan-900 border border-cyan-800 rounded-2xl flex items-center justify-center mb-4 text-white shadow-xl">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">Clear Conditions</h3>
              <p className="text-sm text-cyan-400">Every listing clearly states if it is new, used, or refurbished.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-cyan-900 border border-cyan-800 rounded-2xl flex items-center justify-center mb-4 text-white shadow-xl">
                <Tag className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">Competitive Value</h3>
              <p className="text-sm text-cyan-400">Find the best deals on premium tech with our price match guarantee.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-cyan-900 border border-cyan-800 rounded-2xl flex items-center justify-center mb-4 text-white shadow-xl">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">Fast Discovery</h3>
              <p className="text-sm text-cyan-400">Powerful search and filters to find exactly what you need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories-section" className="py-24 sm:py-32 bg-[#050810] border-b border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 relative">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-cyan-400 animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                <span className="text-[12px] font-black uppercase tracking-[0.4em] text-cyan-400">Explore Matrix</span>
              </div>
              <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-white drop-shadow-xl">
                Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">Category</span>
              </h2>
            </div>
            <Link to="/categories" className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all group shadow-xl backdrop-blur-xl hover:scale-105">
              View All Nodes <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`} className="group relative rounded-[2rem] bg-white/5 border border-white/10 hover:border-cyan-400 transition-all duration-500 overflow-hidden aspect-[3/4] flex flex-col justify-end shadow-2xl hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)] hover:-translate-y-4">
                <div className="absolute inset-0 bg-[#050810]">
                  <img src={category.imageUrl || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600'} alt={category.name} className="w-full h-full object-cover mix-blend-screen opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/70 to-transparent opacity-100 group-hover:opacity-80 transition-opacity duration-500" />
                </div>
                <div className="relative p-8 z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-12 h-12 rounded-full bg-cyan-400 border border-cyan-300 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,211,238,0.6)] opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 delay-100">
                    <ArrowRight className="h-6 w-6 text-cyan-950 -rotate-45" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">{category.name}</h3>
                  <p className="text-[11px] text-cyan-400 font-black uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Initialize &rarr;</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Deals */}
      {hotDeals.length > 0 && (
        <CarouselSection title="Hot Deals 🔥" listings={hotDeals} id="deals-carousel" />
      )}

      {/* Featured/Recent Listings */}
      <CarouselSection title="New Arrivals" listings={displayNewArrivals} id="new-arrivals-carousel" />

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <CarouselSection title="Best Sellers 🏆" listings={bestSellers} id="bestsellers-carousel" />
      )}

      {/* Limited Edition */}
      {limitedEdition.length > 0 && (
        <CarouselSection title="Limited Edition ✨" listings={limitedEdition} id="limited-carousel" />
      )}

      {/* Laptops */}
      <CarouselSection title="Latest Laptops" listings={laptops} id="laptops-carousel" />

      {/* Mobiles */}
      <CarouselSection title="Top Mobiles" listings={mobiles} id="mobiles-carousel" />

      {/* Accessories */}
      <CarouselSection title="Mix Accessories" listings={accessories} id="accessories-carousel" />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* CTA Section */}
      <section className="py-32 bg-[#050810] text-white text-center border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(34,211,238,0.2)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:linear-gradient(to_top,#000_20%,transparent_80%)]" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 border border-cyan-300 text-cyan-950 text-xs font-black uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
            <Zap className="h-4 w-4" /> System Ready
          </div>
          <h2 className="text-6xl sm:text-8xl font-black tracking-tighter mb-8 leading-[1.1] drop-shadow-2xl">
            Upgrade Your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-lg">Tech Setup Today</span>
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-3xl font-medium">
            Initialize your journey into premium tech. Browse our extensive catalog of verified premium laptops, phones, and gaming gear.
          </p>
          <Link to="/shop" className="group relative inline-flex items-center justify-center rounded-full bg-white text-[#050810] px-12 py-6 text-lg font-black tracking-widest uppercase overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-300 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-3 group-hover:text-white transition-colors duration-300">
              Access Shop <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

    </div>
  );
}
