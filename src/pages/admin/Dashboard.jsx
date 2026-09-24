import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import StatusBadge from '../../components/StatusBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import { Card } from '../../components/ui/Card';
import { ArrowRight, Inbox, Clock, Activity, CheckCircle2, Archive, LoaderCircle } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, colorClass }) => (
  <Card className="p-5 flex flex-col hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <p className="text-3xl font-bold text-slate-900">{value}</p>
  </Card>
);

const AdminDashboard = () => {
  const [queries, setQueries] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/admin/queries');
        setQueries(data.queries.slice(0, 10)); // Show 10 recent
        setStats(data.stats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 md:space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Overview of all user queries across the system.</p>
      </div>

      {/* Stats - Grid layout adjusts for mobile */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <Card key={i} className="h-28 animate-pulse bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          <StatCard label="Total" value={stats.totalQueries || 0} icon={Inbox} colorClass="bg-blue-50 text-blue-600" />
          <StatCard label="Pending" value={stats.pending || 0} icon={Clock} colorClass="bg-amber-50 text-amber-600" />
          <StatCard label="In Progress" value={stats.inProgress || 0} icon={Activity} colorClass="bg-indigo-50 text-indigo-600" />
          <StatCard label="Resolved" value={stats.resolved || 0} icon={CheckCircle2} colorClass="bg-emerald-50 text-emerald-600" />
          <StatCard label="Closed" value={stats.closed || 0} icon={Archive} colorClass="bg-slate-100 text-slate-600" />
        </div>
      )}

      {/* Recent Queries */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-slate-200 bg-white">
          <h2 className="font-semibold text-slate-900">Recent Queries</h2>
          <Link to="/admin/queries" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center"><LoaderCircle className="w-8 h-8 text-blue-600 animate-spin" /></div>
        ) : queries.length === 0 ? (
          <EmptyState title="No queries yet" description="No queries have been submitted." icon={Inbox} />
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Query ID</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Created</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {queries.map((q) => (
                    <tr key={q._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-sm font-semibold text-slate-900">{q.queryId}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium text-slate-900">{q.user?.name}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{q.user?.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-700 max-w-xs truncate">{q.subject}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={q.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                        {formatDate(q.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Link
                          to={`/admin/queries/${q._id}`}
                          className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="grid grid-cols-1 divide-y divide-slate-100 md:hidden bg-slate-50/50">
              {queries.map((q) => (
                <div key={q._id} className="p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-slate-900">{q.queryId}</span>
                    <StatusBadge status={q.status} />
                  </div>
                  <h3 className="font-medium text-slate-900 text-sm mb-1 line-clamp-1">{q.subject}</h3>
                  <div className="text-xs text-slate-500 mb-4 flex items-center justify-between">
                    <span>{q.user?.name}</span>
                    <span>{formatDate(q.createdAt)}</span>
                  </div>
                  <Link
                    to={`/admin/queries/${q._id}`}
                    className="flex w-full items-center justify-center gap-1.5 h-9 px-4 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    Manage Query <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default AdminDashboard;
