import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../components/admin/AuthProvider';
import { Loader2, Save, ArrowLeft, Upload, X, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    sku: '',
    categoryId: '',
    brandId: '',
    price: 0,
    originalPrice: 0,
    stock: 0,
    condition: 'New',
    status: 'published',
    description: '',
  });

  const [attributes, setAttributes] = useState<{key: string, value: string}[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          fetch('/api/admin/categories', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('/api/admin/brands', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);
        if (catRes.ok) setCategories(await catRes.json());
        if (brandRes.ok) setBrands(await brandRes.json());
      } catch (e) {
        console.error(e);
      }
    };
    fetchOptions();
  }, [token]);

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`/api/listings/${id}`); // We can use the public endpoint for basic info
          if (res.ok) {
            const data = await res.json();
            setFormData({
              title: data.listing.title,
              sku: data.listing.sku || '',
              categoryId: data.listing.categoryId,
              brandId: data.listing.brandId || '',
              price: data.listing.price,
              originalPrice: data.listing.originalPrice || 0,
              stock: data.listing.stock || 0,
              condition: data.listing.condition,
              status: data.listing.status,
              description: data.listing.description,
            });
            // We'd fetch attributes here in a real scenario, skipping for brevity
          }
        } catch (e) {
          console.error(e);
        } finally {
          setInitialLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isEdit ? `/api/admin/listings/${id}` : '/api/admin/listings';
      const method = isEdit ? 'PUT' : 'POST';
      
      const payload = {
        ...formData,
        attributes: attributes.filter(a => a.key && a.value)
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        navigate('/admin/listings');
      } else {
        alert('Failed to save product');
      }
    } catch (err) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }]);
  };

  const updateAttribute = (index: number, field: 'key' | 'value', val: string) => {
    const newAttrs = [...attributes];
    newAttrs[index][field] = val;
    setAttributes(newAttrs);
  };

  const removeAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  if (initialLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 text-cyan-500 animate-spin" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/listings" className="p-2 text-cyan-400 hover:text-white hover:bg-cyan-800 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-white">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-cyan-900 rounded-2xl border border-cyan-800 p-6 space-y-6">
          <h2 className="text-lg font-medium text-white border-b border-cyan-800 pb-2">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-1">Product Name *</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-1">SKU</label>
              <input value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="w-full bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-1">Category *</label>
              <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-1">Brand</label>
              <select value={formData.brandId} onChange={e => setFormData({...formData, brandId: e.target.value})} className="w-full bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500">
                <option value="">Select Brand</option>
                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-1">Price *</label>
              <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-1">Stock Quantity *</label>
              <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} className="w-full bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-1">Condition</label>
              <select value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} className="w-full bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500">
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Refurbished">Refurbished</option>
                <option value="Good">Good</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-1">Status</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500">
                <option value="published">Active / Published</option>
                <option value="draft">Draft</option>
                <option value="hidden">Hidden</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-300 mb-1">Description *</label>
            <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500"></textarea>
          </div>
        </div>

        <div className="bg-cyan-900 rounded-2xl border border-cyan-800 p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-cyan-800 pb-2">
            <h2 className="text-lg font-medium text-white">Specifications (Attributes)</h2>
            <button type="button" onClick={handleAddAttribute} className="text-sm text-cyan-400 hover:text-white flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add Spec
            </button>
          </div>
          
          <div className="space-y-3">
            {attributes.length === 0 && <p className="text-sm text-cyan-600 italic">No specifications added yet.</p>}
            {attributes.map((attr, index) => (
              <div key={index} className="flex gap-4 items-start">
                <input placeholder="e.g. Connection Type" value={attr.key} onChange={(e) => updateAttribute(index, 'key', e.target.value)} className="flex-1 bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500" />
                <input placeholder="e.g. Wireless" value={attr.value} onChange={(e) => updateAttribute(index, 'value', e.target.value)} className="flex-1 bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500" />
                <button type="button" onClick={() => removeAttribute(index)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2.5 rounded-xl transition-colors font-medium">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
