import { useEffect, useState } from 'react';
import { useAuth } from '../../components/admin/AuthProvider';
import { Loader2, Search, Save } from 'lucide-react';

export default function Inventory() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);
  const { token } = useAuth();

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/listings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setProducts(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const updateStock = async (id: string, newStock: number) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/listings/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ stock: newStock })
      });
      if (res.ok) {
        setProducts(products.map(p => p.id === id ? { ...p, stock: newStock } : p));
      }
    } catch (e) {
      alert('Failed to update stock');
    } finally {
      setUpdating(null);
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Inventory Management</h1>
      </div>

      <div className="bg-cyan-900 rounded-2xl border border-cyan-800 overflow-hidden">
        <div className="p-4 border-b border-cyan-800 flex items-center">
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500" />
            <input 
              type="text" 
              placeholder="Search by name or SKU..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-cyan-950 border border-cyan-700 rounded-xl text-white placeholder-cyan-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 text-cyan-500 animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-cyan-300">
              <thead className="bg-cyan-900/50 text-cyan-400 border-b border-cyan-800 font-medium">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">SKU</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Stock Level</th>
                  <th className="px-6 py-4">Update Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-800/50">
                {filteredProducts.map(product => {
                  let stockStatus = 'In Stock';
                  let stockColor = 'text-green-400 border-green-900/50 bg-green-500/10';
                  
                  if (product.stock === 0) {
                    stockStatus = 'Out of Stock';
                    stockColor = 'text-red-400 border-red-900/50 bg-red-500/10';
                  } else if (product.stock <= 5) {
                    stockStatus = 'Low Stock';
                    stockColor = 'text-amber-400 border-amber-900/50 bg-amber-500/10';
                  }

                  return (
                    <tr key={product.id} className="hover:bg-cyan-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{product.title}</td>
                      <td className="px-6 py-4 text-cyan-500">{product.sku || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${stockColor}`}>
                          {stockStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{product.stock}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            defaultValue={product.stock}
                            min="0"
                            className="w-20 bg-cyan-950 border border-cyan-700 rounded-lg px-2 py-1 text-white focus:outline-none focus:border-cyan-500"
                            onBlur={(e) => {
                              const val = parseInt(e.target.value);
                              if (val !== product.stock && !isNaN(val)) {
                                updateStock(product.id, val);
                              }
                            }}
                            disabled={updating === product.id}
                          />
                          {updating === product.id && <Loader2 className="w-4 h-4 text-cyan-500 animate-spin" />}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
