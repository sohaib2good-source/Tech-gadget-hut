import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Tag, Zap } from 'lucide-react';

const CarouselSection = ({ title, listings, bgColor, titleColor = "text-white", id }: any) => {
  if (!listings || listings.length === 0) return null;
  return (
    <section className={`py-20 ${bgColor} relative border-t-[8px] border-white`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-3xl font-bold tracking-tight ${titleColor}`}>{title}</h2>
          <Link to={`/shop?q=${encodeURIComponent(title)}`} className={`flex items-center text-sm font-semibold text-cyan-950 bg-white px-5 py-2.5 rounded-md hover:bg-gray-100 transition-colors shadow-sm`}>
            View All
          </Link>
        </div>

        <div className="relative group">
          <button
            onClick={() => {
              const container = document.getElementById(id);
              if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-black/40 hover:bg-black/60 text-white p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          <div
            id={id}
            className="grid grid-cols-2 gap-3 sm:flex sm:overflow-x-auto sm:gap-8 pb-8 sm:snap-x sm:snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {listings.map((listing: any, index: number) => (
              <Link 
                key={listing.id} 
                to={`/product/${listing.slug}`} 
                className={`${index >= 4 ? 'hidden sm:flex' : 'flex'} flex-col sm:snap-start sm:flex-shrink-0 w-full sm:w-[320px] group bg-cyan-900 rounded-xl sm:rounded-2xl border border-cyan-800 hover:border-cyan-700 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-lg sm:shadow-2xl`}
              >
                <div className="aspect-square sm:aspect-[4/3] w-full bg-cyan-950 relative overflow-hidden border-b border-cyan-800">
                  <img src={listing.imageUrl || 'https://images.unsplash.com/photo-1550009158-9ebf6d173153?auto=format&fit=crop&q=80&w=500'} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-cyan-900/80 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium text-white border border-white/10">
                    {listing.condition}
                  </div>
                </div>
                <div className="p-3 sm:p-5 flex flex-col flex-grow items-start">
                  <span className="text-[10px] sm:text-xs font-medium text-cyan-500 mb-1 sm:mb-2 line-clamp-1">{listing.category}</span>
                  <h3 className="text-sm sm:text-lg font-medium tracking-tight mb-2 sm:mb-4 line-clamp-2 text-white leading-snug">{listing.title}</h3>
                  <div className="mt-auto pt-3 sm:pt-4 flex flex-col items-start gap-1 w-full border-t border-cyan-800/50">
                    <div className="flex flex-col xl:flex-row xl:items-baseline gap-0.5 sm:gap-2">
                      <span className="text-sm sm:text-xl font-semibold text-white">Rs. {listing.price.toLocaleString(undefined, { minimumFractionDigits: 0 })}</span>
                      {listing.originalPrice && (
                        <span className="text-[10px] sm:text-sm text-cyan-600 line-through">Rs. {listing.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 0 })}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => {
              const container = document.getElementById(id);
              if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-black/40 hover:bg-black/60 text-white p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </section>
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
            <div key={i} className="flex items-center justify-center gap-2.5 flex-shrink-0 mx-3 hover:scale-105 transition-transform duration-300">
              <div className="bg-white/10 p-1.5 rounded-md backdrop-blur-sm border border-white/5">
                <img src={`/brands/${brand.id}.png`} alt={brand.name} className="h-5 w-5 object-contain rounded-sm" />
              </div>
              <span className="text-white/90 font-bold text-sm tracking-wider uppercase font-sans">{brand.name}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center min-w-full justify-around" aria-hidden="true">
          {brands.map((brand, i) => (
            <div key={i} className="flex items-center justify-center gap-2.5 flex-shrink-0 mx-3 hover:scale-105 transition-transform duration-300">
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
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-100 brightness-[1.3] scale-[1.15] origin-top-left"
        >
          <source src="/brands/Drone_filming_building_20260924003857.mp4" type="video/mp4" />
        </video>
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
          <p className="text-lg text-cyan-400 max-w-2xl mx-auto mb-10">
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
      <section id="categories-section" className="py-20 sm:py-28 bg-cyan-950 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-white">Shop by Category</h2>
              <p className="mt-2 text-cyan-400">Browse our extensive catalog of tech gadgets.</p>
            </div>
            <Link to="/categories" className="hidden sm:flex items-center text-sm font-medium text-cyan-400 hover:text-white transition-colors">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`} className="group relative rounded-2xl border border-cyan-800 hover:border-cyan-600 transition-all overflow-hidden aspect-[4/5] flex flex-col justify-end shadow-xl">
                <div className="absolute inset-0">
                  <img src={category.imageUrl || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600'} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/90 via-cyan-950/20 to-transparent" />
                </div>
                <div className="relative p-5">
                  <h3 className="text-sm font-semibold text-white tracking-tight">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured/Recent Listings */}
      <CarouselSection title="New Arrivals" listings={recentListings} bgColor="bg-amber-400" titleColor="text-cyan-950" id="new-arrivals-carousel" />

      {/* Laptops */}
      <CarouselSection title="Latest Laptops" listings={laptops} bgColor="bg-indigo-600" titleColor="text-white" id="laptops-carousel" />

      {/* Mobiles */}
      <CarouselSection title="Top Mobiles" listings={mobiles} bgColor="bg-emerald-600" titleColor="text-white" id="mobiles-carousel" />

      {/* Accessories */}
      <CarouselSection title="Mix Accessories" listings={accessories} bgColor="bg-purple-600" titleColor="text-white" id="accessories-carousel" />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-cyan-950 text-white text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 to-cyan-950/20" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight mb-6">Upgrade Your Tech Setup Today</h2>
          <p className="text-lg text-cyan-400 mb-10">
            Browse our extensive catalog of verified premium laptops, phones, and gaming gear.
          </p>
          <Link to="/shop" className="inline-flex rounded-full bg-white text-cyan-950 px-8 py-4 text-sm font-semibold hover:bg-cyan-200 transition-colors">
            Shop Collection
          </Link>
        </div>
      </section>

    </div>
  );
}
