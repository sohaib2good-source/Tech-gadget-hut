import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { useCart } from './CartContext';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  
  const [submitting, setSubmitting] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items,
          total
        })
      });

      if (response.ok) {
        alert('Order submitted successfully! We will contact you soon.');
        clearCart();
        setIsCartOpen(false);
        setFormData({ name: '', phone: '', address: '' });
      } else {
        alert('Failed to submit order. Please try again.');
      }
    } catch (err) {
      alert('Error submitting order.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {isCartOpen && (
        <div 
          className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <div 
        className={`fixed inset-y-0 right-0 z-[90] w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    {item.imageUrl && (
                      <div className="w-20 h-20 bg-white rounded-lg p-2 shadow-sm border border-gray-100 flex-shrink-0">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 truncate">{item.title}</h3>
                        <p className="text-sm font-bold text-[#42a5f5] mt-1">Rs {item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">Qty: {item.quantity}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center font-bold text-lg text-gray-900">
                <span>Total:</span>
                <span>Rs {total.toLocaleString()}</span>
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmit} className="space-y-4 mt-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">Delivery Details</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-[#42a5f5] focus:ring-1 focus:ring-[#42a5f5] outline-none text-gray-900" 
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-[#42a5f5] focus:ring-1 focus:ring-[#42a5f5] outline-none text-gray-900"
                    placeholder="0300 1234567"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Complete Address</label>
                  <textarea 
                    required 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-[#42a5f5] focus:ring-1 focus:ring-[#42a5f5] outline-none text-gray-900 min-h-[80px]"
                    placeholder="House No, Street, Area, City"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-[#42a5f5] hover:bg-blue-600 text-white font-medium py-3 rounded-xl shadow-md transition-all disabled:opacity-70 mt-2"
                >
                  {submitting ? 'Submitting...' : 'Confirm Order'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
