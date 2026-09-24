import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { MessageSquareText, CircleAlert, Mail, Lock, User as UserIcon } from 'lucide-react';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      login(data.user, data.token);
      navigate('/user/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm mb-4">
            <MessageSquareText className="w-7 h-7" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Create an account</h1>
          <p className="text-slate-500 text-sm mt-1.5">Join QueryDesk to get support</p>
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
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Kumar"
                icon={UserIcon}
              />
            </div>
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
                placeholder="Min 6 characters"
                icon={Lock}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
              <Input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Repeat password"
                icon={Lock}
              />
            </div>
            
            <Button
              type="submit"
              isLoading={loading}
              className="w-full mt-2"
            >
              Create Account
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-slate-500 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
