import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, ArrowRight, ShieldCheck, Tag, Zap } from 'lucide-react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [listings, setListings] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states matching URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
  const [selectedCondition, setSelectedCondition] = useState(searchParams.get('condition') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/categories').then(r => r.json()),
      fetch('/api/brands').then(r => r.json())
    ]).then(([cats, brnds]) => {
      setCategories(cats);
      setBrands(brnds);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    fetch(`/api/listings?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedBrand) params.set('brand', selectedBrand);
    if (selectedCondition) params.set('condition', selectedCondition);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    
    setSearchParams(params);
    setIsMobileFiltersOpen(false);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedCondition('');
    setMinPrice('');
    setMaxPrice('');
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-cyan-950 text-white">
      {/* Header / Search Bar */}
      <div className="bg-cyan-900/50 border-b border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                className="block w-full pl-12 pr-6 py-4 rounded-full border border-white/10 bg-cyan-950 text-white placeholder:text-cyan-500 focus:outline-none focus:border-cyan-400 text-sm transition-all shadow-xl"
              />
            </div>
            <button type="submit" className="px-8 py-4 rounded-full bg-cyan-500 text-cyan-950 font-semibold hover:bg-cyan-400 transition-colors shadow-xl">
              Search
            </button>
            <button 
              type="button" 
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="lg:hidden px-4 py-4 rounded-full bg-cyan-800 text-white font-semibold hover:bg-cyan-700 transition-colors shadow-xl flex items-center justify-center"
            >
              <Filter className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8 items-start w-full">
        
        {/* Left Sidebar Filters */}
        <aside className={`lg:w-64 flex-shrink-0 ${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block bg-cyan-900/30 border border-white/5 rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
              Filters
            </h2>
            <button onClick={clearFilters} className="text-xs text-cyan-400 hover:text-white underline">
              Clear All
            </button>
          </div>

          <div className="space-y-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-cyan-300 mb-3">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-cyan-200 transition-colors">
                  <input type="radio" name="category" checked={selectedCategory === ''} onChange={() => setSelectedCategory('')} className="accent-cyan-500" />
                  All Categories
                </label>
                {categories.map(cat => (
                  <label key={cat.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-cyan-200 transition-colors">
                    <input type="radio" name="category" checked={selectedCategory === cat.slug} onChange={() => setSelectedCategory(cat.slug)} className="accent-cyan-500" />
                    {cat.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="text-sm font-medium text-cyan-300 mb-3">Brand</h3>
              <select 
                value={selectedBrand} 
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-cyan-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.slug}>{brand.name}</option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <h3 className="text-sm font-medium text-cyan-300 mb-3">Condition</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-cyan-200 transition-colors">
                  <input type="radio" name="condition" checked={selectedCondition === ''} onChange={() => setSelectedCondition('')} className="accent-cyan-500" />
                  Any Condition
                </label>
                {['New', 'Like New', 'Good', 'Fair'].map(cond => (
                  <label key={cond} className="flex items-center gap-2 text-sm cursor-pointer hover:text-cyan-200 transition-colors">
                    <input type="radio" name="condition" checked={selectedCondition === cond} onChange={() => setSelectedCondition(cond)} className="accent-cyan-500" />
                    {cond}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-sm font-medium text-cyan-300 mb-3">Price Range (Rs.)</h3>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-cyan-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"
                />
                <span className="text-cyan-500">-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-cyan-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button onClick={applyFilters} className="w-full bg-white text-cyan-950 font-semibold py-3 rounded-xl hover:bg-cyan-200 transition-colors text-sm">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Main Content (Product Grid) */}
        <div className="flex-1 w-full">
          <div className="mb-6 flex justify-between items-end">
            <h1 className="text-2xl font-semibold tracking-tight text-white">Our Premium Inventory</h1>
            <span className="text-sm text-cyan-400">{listings.length} items found</span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-32 bg-cyan-900/30 rounded-2xl border border-white/5">
              <Search className="w-12 h-12 text-cyan-500 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium text-white mb-2">No items found</h3>
              <p className="text-cyan-400 mb-6">Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="px-6 py-3 bg-cyan-800 hover:bg-cyan-700 rounded-full text-sm font-medium transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <Link key={listing.id} to={`/product/${listing.slug}`} className="group bg-cyan-900 rounded-2xl overflow-hidden border border-cyan-800 hover:border-cyan-600 transition-all flex flex-col shadow-lg">
                  <div className="aspect-[4/3] bg-cyan-950 overflow-hidden relative">
                    {listing.imageUrl ? (
                      <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Tag className="w-12 h-12 text-cyan-800" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-cyan-950/80 backdrop-blur text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/10">
                      {listing.condition}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-2 flex items-center gap-2 text-xs font-medium text-cyan-400 uppercase tracking-wider">
                      <span>{listing.category}</span>
                      {listing.brand && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-cyan-700" />
                          <span>{listing.brand}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-lg font-medium tracking-tight mb-4 line-clamp-2 text-white group-hover:text-cyan-300 transition-colors">{listing.title}</h3>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-cyan-800/50">
                      <div className="flex flex-col">
                        <span className="text-xl font-semibold text-white">Rs. {listing.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        {listing.originalPrice && (
                          <span className="text-xs text-cyan-500 line-through">Rs. {listing.originalPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-cyan-800 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-cyan-950 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
