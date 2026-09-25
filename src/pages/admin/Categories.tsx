import { useEffect, useState } from 'react';
import { useAuth } from '../../components/admin/AuthProvider';
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react';

export default function CategoriesAndBrands() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  
  const { token } = useAuth();
  
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [catFormData, setCatFormData] = useState({ name: '', slug: '' });

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setCategories(await res.json());
    } finally {
      setLoadingCats(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  const handleCatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingCatId ? `/api/admin/categories/${editingCatId}` : '/api/admin/categories';
      const method = editingCatId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(catFormData)
      });

      if (res.ok) {
        setCatFormData({ name: '', slug: '' });
        setEditingCatId(null);
        fetchCategories();
      }
    } catch (err) {
      alert('Error saving category');
    }
  };



  const handleCatDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchCategories();
    } catch (e) {
      alert('Error deleting');
    }
  };



  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      
      {/* CATEGORIES SECTION */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Categories Management</h1>
          <p className="text-sm text-cyan-400 mt-1">Note: Categories added here will be available to select when entering a new product.</p>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="bg-cyan-900 rounded-2xl border border-cyan-800 p-6">
            <h2 className="text-lg font-medium text-white mb-4">
              {editingCatId ? 'Edit Category' : 'Add Category'}
            </h2>
            <form onSubmit={handleCatSubmit} className="flex flex-col md:flex-row items-end gap-4">
              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-cyan-300 mb-1">Name</label>
                <input 
                  required 
                  value={catFormData.name} 
                  onChange={e => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    if(!editingCatId) setCatFormData({ name, slug });
                    else setCatFormData({ ...catFormData, name });
                  }} 
                  className="w-full bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white focus:border-cyan-500 outline-none" 
                />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-cyan-300 mb-1">Slug</label>
                <input 
                  required 
                  value={catFormData.slug} 
                  onChange={e => setCatFormData({ ...catFormData, slug: e.target.value })} 
                  className="w-full bg-cyan-950 border border-cyan-700 rounded-xl px-4 py-2 text-white focus:border-cyan-500 outline-none" 
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button type="submit" className="flex-1 md:w-32 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  {editingCatId ? 'Update' : 'Add'}
                </button>
                {editingCatId && (
                  <button type="button" onClick={() => { setEditingCatId(null); setCatFormData({name: '', slug: ''}) }} className="flex-1 md:w-32 bg-cyan-800 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-cyan-900 rounded-2xl border border-cyan-800 overflow-hidden">
              {loadingCats ? (
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
                    {categories.map(c => (
                      <tr key={c.id} className="hover:bg-cyan-800/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{c.name}</td>
                        <td className="px-6 py-4 text-cyan-500">{c.slug}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => { setEditingCatId(c.id); setCatFormData({ name: c.name, slug: c.slug }); }} className="p-2 text-cyan-400 hover:bg-cyan-700 rounded-lg">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleCatDelete(c.id, c.name)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
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
