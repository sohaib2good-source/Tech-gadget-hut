import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Calendar, Heart, Share2, ShoppingBag } from 'lucide-react';
import { useCart } from '../components/CartContext';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/listings/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(d => {
        setData(d);
        if (d.images && d.images.length > 0) {
          setActiveImage(d.images[0].url);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="animate-pulse flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-3/5 aspect-[4/3] bg-cyan-200 rounded-2xl"></div>
          <div className="w-full lg:w-2/5 space-y-4">
            <div className="h-4 bg-cyan-200 rounded w-1/4"></div>
            <div className="h-10 bg-cyan-200 rounded w-3/4"></div>
            <div className="h-8 bg-cyan-200 rounded w-1/3"></div>
            <div className="h-32 bg-cyan-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-cyan-900 mb-4">We couldn't find that gadget.</h2>
        <p className="text-cyan-600 mb-8">The listing might have been removed or sold.</p>
        <Link to="/" className="inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500">
          Return Home
        </Link>
      </div>
    );
  }

  const { listing, category, brand, images } = data;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Breadcrumbs */}
      <nav className="flex text-sm font-medium text-cyan-500 mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link to={`/categories`} className="hover:text-white transition-colors">Categories</Link></li>
          <li><span className="mx-2">/</span></li>
          {category && (
            <>
              <li><Link to={`/category/${category.slug}`} className="hover:text-white transition-colors">{category.name}</Link></li>
              <li><span className="mx-2">/</span></li>
            </>
          )}
          <li className="text-white" aria-current="page">{listing.title}</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Images */}
        <div className="w-full lg:w-3/5">
          <div className="aspect-[4/3] bg-cyan-900 border border-cyan-800 rounded-2xl overflow-hidden mb-6 relative">
            {activeImage ? (
              <img src={activeImage} alt={listing.title} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-cyan-500">No Image</div>
            )}
            <div className="absolute top-4 left-4 bg-cyan-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
              {listing.condition}
            </div>
          </div>
          
          {images && images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img: any) => (
                <button 
                  key={img.id}
                  onClick={() => setActiveImage(img.url)}
                  className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img.url ? 'border-cyan-500' : 'border-cyan-800 hover:border-cyan-600'}`}
                >
                  <img src={img.url} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="w-full lg:w-2/5 flex flex-col">
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-cyan-400 block">{category?.name} {brand ? `• ${brand.name}` : ''}</span>
            <div className="flex gap-2">
              <button className="p-2 text-cyan-400 hover:text-white hover:bg-cyan-800 transition-colors rounded-full">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-cyan-400 hover:text-red-400 hover:bg-red-500/10 transition-colors rounded-full">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight mb-4 leading-tight">{listing.title}</h1>
          
          <div className="flex items-end gap-3 mb-8 pb-8 border-b border-white/5">
            <span className="text-4xl font-semibold text-white">Rs. {listing.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            {listing.originalPrice && (
              <span className="text-lg text-cyan-500 line-through mb-1">Rs. {listing.originalPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            )}
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm text-cyan-300 font-medium">
              <Calendar className="w-5 h-5 text-cyan-500" />
              <span>Added {new Date(listing.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-cyan-300 font-medium">
              <ShieldCheck className="w-5 h-5 text-cyan-500" />
              <span>Condition: <strong className="text-white">{listing.condition}</strong></span>
            </div>
            {listing.color && (
              <div className="flex items-center gap-3 text-sm text-cyan-300 font-medium">
                <div className="w-5 h-5 rounded-full border border-cyan-500 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white opacity-80" />
                </div>
                <span>Color: <strong className="text-white">{listing.color}</strong></span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mb-8">
            <button 
              onClick={() => addToCart({
                id: listing.id,
                title: listing.title,
                price: listing.price,
                imageUrl: images?.[0]?.url
              })}
              className="w-full bg-white text-cyan-950 px-8 py-4 text-sm font-semibold hover:bg-cyan-200 transition-colors rounded-full flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" /> Add to Cart
            </button>
            <button className="w-full bg-cyan-900 border border-cyan-800 text-white px-8 py-4 text-sm font-semibold hover:bg-cyan-800 transition-colors rounded-full">
              Buy Now
            </button>
          </div>

        </div>
      </div>

      {/* Description Section */}
      <div className="mt-16 lg:mt-24 border-t border-white/5 pt-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white mb-6">Description</h2>
          <div className="prose prose-invert max-w-none text-cyan-300 leading-relaxed">
            <p className="whitespace-pre-wrap">{listing.description}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
