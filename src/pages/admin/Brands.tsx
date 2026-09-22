import { useEffect, useState } from 'react';
import { useAuth } from '../../components/admin/AuthProvider';
import { Loader2, Edit, Trash2 } from 'lucide-react';

export default function Brands() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '' });

  const fetchBrands = async () => {
    try {
      const res = await fetch('/api/admin/brands', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setBrands(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/admin/brands/${editingId}` : '/api/admin/brands';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setFormData({ name: '', slug: '' });
        setEditingId(null);
        fetchBrands();
      }
    } catch (err) {
      alert('Error saving brand');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete brand "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/brands/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchBrands();
    } catch (e) {
      alert('Error deleting');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-white">Brands Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-cyan-900 rounded-2xl border border-cyan-800 p-6">
            <h2 className="text-lg font-medium text-white mb-4">
              {editingId ? 'Edit Brand' : 'Add Brand'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-1">Name</label>
                <input 
                  required 
                  value={formData.name} 
                  onChange={e => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    if(!editingId) setFormData({ name, slug });
                    else setFormData({ ...formData, name });
                  }} 
                  className="w-full bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white focus:border-cyan-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-1">Slug</label>
                <input 
                  required 
                  value={formData.slug} 
                  onChange={e => setFormData({ ...formData, slug: e.target.value })} 
                  className="w-full bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white focus:border-cyan-500 outline-none" 
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-xl text-sm font-medium transition-colors">
                  {editingId ? 'Update' : 'Add'}
                </button>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setFormData({name: '', slug: ''}) }} className="bg-cyan-800 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-cyan-900 rounded-2xl border border-cyan-800 overflow-hidden">
            {loading ? (
              <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 text-cyan-500 animate-spin" /></div>
            ) : (
              <table className="w-full text-left text-sm text-cyan-300">
                <thead className="bg-cyan-900/50 text-cyan-400 border-b border-cyan-800 font-medium">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Slug</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyan-800/50">
                  {brands.map(b => (
                    <tr key={b.id} className="hover:bg-cyan-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{b.name}</td>
                      <td className="px-6 py-4 text-cyan-500">{b.slug}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => { setEditingId(b.id); setFormData({ name: b.name, slug: b.slug }); }} className="p-2 text-cyan-400 hover:bg-cyan-700 rounded-lg">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(b.id, b.name)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
