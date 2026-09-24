import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import StatusBadge from '../../components/StatusBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Plus, MessageSquareOff, ArrowRight } from 'lucide-react';

const QueryList = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const { data } = await api.get('/queries/my');
        setQueries(data.queries);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQueries();
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">My Queries</h1>
          <p className="text-slate-500 text-sm mt-1">All your submitted queries and their current status.</p>
        </div>
        <Link to="/user/queries/new">
          <Button icon={Plus}>New Query</Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="py-16"><LoadingSpinner /></div>
        ) : queries.length === 0 ? (
          <EmptyState
            title="No queries found"
            description="You haven't submitted any queries yet. Click 'New Query' to get started."
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
                          to={`/user/queries/${q._id}`}
                          className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors"
                        >
                          View
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
                  <h3 className="font-medium text-slate-900 text-sm mb-2 line-clamp-2">{q.subject}</h3>
                  <div className="text-xs text-slate-500 mb-4 space-y-1">
                    <p className="flex justify-between"><span>Created:</span> <span>{formatDate(q.createdAt)}</span></p>
                    <p className="flex justify-between"><span>Updated:</span> <span>{formatDate(q.updatedAt)}</span></p>
                  </div>
                  <Link
                    to={`/user/queries/${q._id}`}
                    className="flex w-full items-center justify-center gap-1.5 h-9 px-4 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    View Details
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

export default QueryList;
