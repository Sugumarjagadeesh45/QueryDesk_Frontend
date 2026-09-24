import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import StatusBadge from '../../components/StatusBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Card } from '../../components/ui/Card';
import { ArrowLeft, MessageSquare, Clock, CalendarDays, CircleAlert } from 'lucide-react';

const QueryDetails = () => {
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await api.get(`/queries/${id}`);
        setQuery(data.query);
      } catch (err) {
        setError(err.response?.data?.message || 'Query not found or access denied.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuery();
  }, [id]);

  const formatDate = (d) =>
    new Date(d).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  if (loading) {
    return <div className="py-16"><LoadingSpinner /></div>;
  }

  if (error && !query) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 max-w-2xl mx-auto mt-8 flex items-start gap-3">
        <CircleAlert className="w-5 h-5 mt-0.5" />
        <div>
          <p className="font-semibold">Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Back link */}
      <div>
        <Link
          to="/user/queries"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Queries
        </Link>
      </div>

      <Card className="overflow-hidden shadow-sm">
        {/* Query header */}
        <div className="px-5 md:px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <span className="text-sm font-mono font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
              {query.queryId}
            </span>
            <StatusBadge status={query.status} />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">{query.subject}</h1>
        </div>

        {/* Query body */}
        <div className="px-5 md:px-6 py-6 space-y-8">
          {/* Description */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              <MessageSquare className="w-4 h-4" /> Description
            </h3>
            <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-100">
              {query.description}
            </div>
          </div>

          {/* Admin Response */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Admin Response
            </h3>
            {query.adminResponse ? (
              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-5">
                <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">{query.adminResponse}</p>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-slate-50 text-slate-500 text-sm italic p-4 rounded-lg border border-slate-100 border-dashed">
                <Clock className="w-4 h-4" />
                No response from admin yet. We'll update you soon.
              </div>
            )}
          </div>
        </div>
        
        {/* Dates */}
        <div className="px-5 md:px-6 py-4 bg-slate-50 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Created</p>
              <p className="text-sm text-slate-700 mt-0.5 font-medium">{formatDate(query.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Last Updated</p>
              <p className="text-sm text-slate-700 mt-0.5 font-medium">{formatDate(query.updatedAt)}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QueryDetails;
