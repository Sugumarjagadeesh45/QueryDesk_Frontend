import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { MessageSquareText, CircleAlert, Mail, Lock, User as UserIcon } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.user, data.token);
      if (data.user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm mb-4">
            <MessageSquareText className="w-7 h-7" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1.5">Sign in to your QueryDesk account</p>
        </div>

        <Card className="p-6 sm:p-8 shadow-sm">
          {error && (
            <div className="flex items-center gap-2 mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              <CircleAlert className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                icon={Mail}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                icon={Lock}
              />
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full mt-2"
            >
              Sign In
            </Button>
          </form>

          {/* Quick test credentials */}
          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="font-semibold text-slate-500 text-xs uppercase tracking-wider mb-3">Test Credentials</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* User Credentials */}
              <div>
                <p className="font-medium text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                  <UserIcon className="w-4 h-4 text-slate-400" /> User
                </p>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="block text-slate-500 mb-1">Email</span>
                    <span className="block font-mono text-slate-700 bg-white border border-slate-200 px-2.5 py-1.5 rounded-md truncate select-all">
                      user@example.com
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-500 mb-1">Password</span>
                    <span className="block font-mono text-slate-700 bg-white border border-slate-200 px-2.5 py-1.5 rounded-md select-all">
                      User@123
                    </span>
                  </div>
                </div>
              </div>

              {/* Admin Credentials */}
              <div>
                <p className="font-medium text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-slate-400" /> Admin
                </p>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="block text-slate-500 mb-1">Email</span>
                    <span className="block font-mono text-slate-700 bg-white border border-slate-200 px-2.5 py-1.5 rounded-md truncate select-all">
                      admin@example.com
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-500 mb-1">Password</span>
                    <span className="block font-mono text-slate-700 bg-white border border-slate-200 px-2.5 py-1.5 rounded-md select-all">
                      Admin@123
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Card>

        <p className="text-center text-sm text-slate-500 mt-8">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
