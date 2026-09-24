import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import StatusBadge from '../../components/StatusBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Search, ArrowRight, MessageSquareOff } from 'lucide-react';

const STATUS_OPTIONS = ['ALL', 'PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

const AdminQueryList = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchQueries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.append('search', search.trim());
      if (statusFilter !== 'ALL') params.append('status', statusFilter);

      const { data } = await api.get(`/admin/queries?${params}`);
      setQueries(data.queries);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchQueries, 400);
    return () => clearTimeout(timer);
  }, [fetchQueries]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">All Queries</h1>
        <p className="text-slate-500 text-sm mt-1">Manage and respond to user queries.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Search by Query ID, user name, or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === 'ALL' ? 'All Statuses' : s.replace('_', ' ')}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Queries Card */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="py-16"><LoadingSpinner /></div>
        ) : queries.length === 0 ? (
          <EmptyState
            title="No queries found"
            description="No queries match your current search or filter criteria."
            icon={MessageSquareOff}
          />
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
                    <th className="px-6 py-4">Updated</th>
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
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500">{formatDate(q.createdAt)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500">{formatDate(q.updatedAt)}</td>
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
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 text-xs text-slate-500">
                Showing <span className="font-medium text-slate-900">{queries.length}</span> {queries.length === 1 ? 'query' : 'queries'}
              </div>
            </div>

            {/* Mobile Cards View */}
            <div className="grid grid-cols-1 divide-y divide-slate-100 md:hidden bg-slate-50/50">
              {queries.map((q) => (
                <div key={q._id} className="p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-slate-900">{q.queryId}</span>
                    <StatusBadge status={q.status} />
                  </div>
                  <h3 className="font-medium text-slate-900 text-sm mb-1 line-clamp-2">{q.subject}</h3>
                  <div className="text-xs text-slate-500 mb-4 space-y-1">
                    <p className="flex justify-between"><span>User:</span> <span className="font-medium text-slate-700">{q.user?.name}</span></p>
                    <p className="flex justify-between"><span>Created:</span> <span>{formatDate(q.createdAt)}</span></p>
                  </div>
                  <Link
                    to={`/admin/queries/${q._id}`}
                    className="flex w-full items-center justify-center gap-1.5 h-9 px-4 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    Manage Query <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
              <div className="p-4 text-center text-xs text-slate-500">
                Showing {queries.length} {queries.length === 1 ? 'query' : 'queries'}
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default AdminQueryList;
