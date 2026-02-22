import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', gender: '', age: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register(form);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">&#127947;</span>
            <span className="text-2xl font-bold text-textPrimary">IronFlow</span>
          </div>
          <p className="text-textSecondary text-sm">Create your account</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-3 py-2">
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Alex Johnson" className="input-field" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-field" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" className="input-field" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-textSecondary mb-1.5">Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange} className="input-field">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-textSecondary mb-1.5">Age</label>
                <input name="age" type="number" min="13" max="120" value={form.age} onChange={handleChange} placeholder="25" className="input-field" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Create Account
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-textSecondary">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
