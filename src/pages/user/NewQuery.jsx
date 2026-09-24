import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Send, CircleAlert, CheckCircle2 } from 'lucide-react';

const NewQuery = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ subject: '', description: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.subject.trim()) return setError('Subject is required.');
    if (!form.description.trim()) return setError('Description is required.');

    setLoading(true);
    try {
      const { data } = await api.post('/queries', form);
      setSuccess(`Query submitted successfully! Your Query ID is: ${data.query.queryId}`);
      setForm({ subject: '', description: '' });
      setTimeout(() => navigate('/user/queries'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit query. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Create New Query</h1>
        <p className="text-slate-500 text-sm mt-1">
          Describe your issue in detail and we'll get back to you as soon as possible.
        </p>
      </div>

      <Card className="p-5 md:p-8">
        {error && (
          <div className="flex items-center gap-2 mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <CircleAlert className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="e.g. Login is not working"
              maxLength={100}
            />
            <p className="text-xs text-slate-400 mt-1.5 flex justify-end">
              {form.subject.length}/100
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your issue in detail..."
              rows={6}
              maxLength={1000}
              className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-colors placeholder:text-slate-400"
            />
            <p className="text-xs text-slate-400 mt-1.5 flex justify-end">
              {form.description.length}/1000
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/user/queries')}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={loading}
              icon={Send}
              className="w-full sm:w-auto"
            >
              Submit Query
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewQuery;
