import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import StatusBadge from '../../components/StatusBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { ArrowLeft, User as UserIcon, CalendarDays, Clock, Save, ShieldCheck, CheckCircle2, CircleAlert } from 'lucide-react';

const STATUS_OPTIONS = ['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

const AdminQueryDetails = () => {
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({ status: '', adminResponse: '' });

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await api.get(`/admin/queries/${id}`);
        setQuery(data.query);
        setForm({
          status: data.query.status,
          adminResponse: data.query.adminResponse || '',
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load query.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuery();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setUpdating(true);
    try {
      const { data } = await api.patch(`/admin/queries/${id}`, form);
      setQuery(data.query);
      setSuccess('Query updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

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
          <p className="font-semibold">Unable to load query</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Back Link */}
      <div>
        <Link
          to="/admin/queries"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Queries
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left: Query Info */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="px-5 md:px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">{query?.queryId}</span>
                <StatusBadge status={query?.status} />
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">{query?.subject}</h1>
            </div>

            <div className="px-5 md:px-6 py-6 space-y-6">
              {/* User Info */}
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="p-2 bg-white rounded-full shadow-sm border border-slate-200 mt-0.5">
                  <UserIcon className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Submitted by</p>
                  <p className="font-medium text-slate-900">{query?.user?.name}</p>
                  <p className="text-sm text-slate-500">{query?.user?.email}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Description</p>
                <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap bg-white">
                  {query?.description}
                </div>
              </div>
            </div>
            
            {/* Dates Footer */}
            <div className="px-5 md:px-6 py-4 bg-slate-50 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase">Created</p>
                  <p className="text-xs text-slate-700 mt-0.5">{formatDate(query?.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase">Last Updated</p>
                  <p className="text-xs text-slate-700 mt-0.5">{formatDate(query?.updatedAt)}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Admin Update Form */}
        <div>
          <Card className="sticky top-24 overflow-hidden shadow-md shadow-slate-200/50 border-slate-200">
            <div className="px-5 md:px-6 py-4 bg-white border-b border-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="font-semibold text-slate-900">Update Query</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage status and respond to user.</p>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="p-5 md:p-6 space-y-6 bg-slate-50/30">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  <CircleAlert className="w-4 h-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <p>{success}</p>
                </div>
              )}

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                <Select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-white font-medium"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s.replace('_', ' ')}</option>
                  ))}
                </Select>
                
                {/* Status flow indicator */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3 text-xs">
                  {STATUS_OPTIONS.map((s, i) => (
                    <div key={s} className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded-md border transition-colors ${
                        form.status === s
                          ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold'
                          : 'bg-white border-slate-200 text-slate-500'
                      }`}>
                        {s.replace('_', ' ')}
                      </span>
                      {i < STATUS_OPTIONS.length - 1 && <span className="text-slate-300">→</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Response */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Admin Response</label>
                <textarea
                  value={form.adminResponse}
                  onChange={(e) => setForm({ ...form, adminResponse: e.target.value })}
                  rows={5}
                  placeholder="Write your response to the user here..."
                  className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-colors placeholder:text-slate-400"
                />
              </div>

              <Button
                type="submit"
                isLoading={updating}
                icon={Save}
                className="w-full"
              >
                Save Changes
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminQueryDetails;
