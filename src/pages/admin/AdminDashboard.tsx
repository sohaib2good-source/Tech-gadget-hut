import { ShoppingBag, Users, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/admin/AuthProvider';

interface Stats {
  totalListings: number;
  activeListings: number;
  lowStock: number;
  outOfStock: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 text-cyan-500 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-cyan-900 p-6 rounded-2xl border border-cyan-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-cyan-400 mb-1">Total Products</p>
              <h3 className="text-3xl font-semibold text-white">{stats?.totalListings || 0}</h3>
            </div>
            <div className="p-3 bg-cyan-800 text-white rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
        </div>
        
        <div className="bg-cyan-900 p-6 rounded-2xl border border-cyan-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-cyan-400 mb-1">Active Products</p>
              <h3 className="text-3xl font-semibold text-white">{stats?.activeListings || 0}</h3>
            </div>
            <div className="p-3 bg-cyan-800 text-white rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-cyan-900 p-6 rounded-2xl border border-cyan-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-cyan-400 mb-1">Low Stock</p>
              <h3 className="text-3xl font-semibold text-white">{stats?.lowStock || 0}</h3>
            </div>
            <div className="p-3 bg-cyan-800 text-white rounded-xl">
              <AlertCircle className="w-5 h-5 text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-cyan-900 p-6 rounded-2xl border border-cyan-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-cyan-400 mb-1">Out of Stock</p>
              <h3 className="text-3xl font-semibold text-white">{stats?.outOfStock || 0}</h3>
            </div>
            <div className="p-3 bg-cyan-800 text-white rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
