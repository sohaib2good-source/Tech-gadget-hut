import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Footer() {
  const [loginClicks, setLoginClicks] = useState(0);
  const navigate = useNavigate();

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newClicks = loginClicks + 1;
    if (newClicks >= 7) {
      navigate('/admin/login');
      setLoginClicks(0);
    } else {
      setLoginClicks(newClicks);
    }
  };

  return (
    <footer className="bg-cyan-950 text-cyan-400 mt-16 pt-16 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 font-sans">
        
        <div>
          <Link to="/">
            <div className="bg-white rounded-xl px-6 py-3 inline-flex mb-6 shadow-md min-w-[180px] justify-center">
              <img src="/brands/logo-main.jpeg?v=2" alt="Tech Gadget Hut" className="h-16 w-auto object-contain mix-blend-multiply" />
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-cyan-500">
            Your premier destination to buy new, used, and refurbished technology. Discover amazing deals on verified premium gadgets.
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Store</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link to="/used-gadgets" className="hover:text-white transition-colors">Used Gadgets</Link></li>
            <li><Link to="/deals" className="hover:text-white transition-colors">Today's Deals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Support</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Account</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link 
                to="/login" 
                onClick={handleLoginClick}
                className="hover:text-white transition-colors"
              >
                Login / Register
              </Link>
            </li>
            <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
          </ul>
        </div>

      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 py-8 border-t border-white/5 text-sm flex flex-col md:flex-row justify-between items-center text-cyan-500">
        <p>&copy; {new Date().getFullYear()} Tech Gadget Hut. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Premium Tech Boutique</p>
      </div>
    </footer>
  );
}
