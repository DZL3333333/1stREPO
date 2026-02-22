import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';

function PRSection({ profile, onUpdate }) {
  const [newPR, setNewPR] = useState({ exercise: '', weight: '', unit: 'lbs', date: '' });
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newPR.exercise.trim() || !newPR.weight.trim()) {
      setError('Exercise and weight are required');
      return;
    }
    setError('');
    setAdding(true);
    try {
      const res = await api.post('/profile/prs', newPR);
      onUpdate(res.data.profile);
      setNewPR({ exercise: '', weight: '', unit: 'lbs', date: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add PR');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (prId) => {
    try {
      const res = await api.delete(`/profile/prs/${prId}`);
      onUpdate(res.data.profile);
    } catch {
      // ignore
    }
  };

  const prs = profile?.prs || [];

  return (
    <div className="card">
      <h2 className="text-base font-semibold text-textPrimary mb-4 flex items-center gap-2">
        <span>&#127942;</span> Personal Records
      </h2>

      {prs.length === 0 ? (
        <p className="text-textMuted text-sm mb-4">No PRs logged yet. Add your first one below.</p>
      ) : (
        <div className="space-y-2 mb-4">
          {prs.map((pr) => (
            <div key={pr.id} className="flex items-center justify-between bg-surface-50 rounded-lg px-3 py-2 group">
              <div>
                <p className="text-sm font-medium text-textPrimary">{pr.exercise}</p>
                {pr.date && <p className="text-xs text-textMuted">{pr.date}</p>}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-accent">{pr.weight} {pr.unit}</span>
                <button
                  onClick={() => handleDelete(pr.id)}
                  className="opacity-0 group-hover:opacity-100 text-textMuted hover:text-red-400 transition-all"
                  title="Remove PR"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add PR form */}
      <form onSubmit={handleAdd} className="space-y-3 pt-3 border-t border-border">
        <h3 className="text-xs font-semibold text-textMuted uppercase tracking-wider">Log New PR</h3>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <input
            value={newPR.exercise}
            onChange={(e) => setNewPR((p) => ({ ...p, exercise: e.target.value }))}
            placeholder="Exercise name"
            className="input-field text-sm sm:col-span-2"
          />
          <input
            value={newPR.weight}
            onChange={(e) => setNewPR((p) => ({ ...p, weight: e.target.value }))}
            placeholder="Weight"
            className="input-field text-sm"
          />
          <select
            value={newPR.unit}
            onChange={(e) => setNewPR((p) => ({ ...p, unit: e.target.value }))}
            className="input-field text-sm"
          >
            <option value="lbs">lbs</option>
            <option value="kg">kg</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="date"
            value={newPR.date}
            onChange={(e) => setNewPR((p) => ({ ...p, date: e.target.value }))}
            className="input-field text-sm max-w-[160px]"
          />
          <button type="submit" disabled={adding} className="btn-primary text-sm flex items-center gap-1.5">
            {adding && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            Add PR
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    gender: user?.gender || '',
    age: user?.age || '',
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMsg('');
    try {
      const res = await api.put('/profile', form);
      updateUser(res.data.profile);
      setMsg('Profile updated!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="mb-2">
        <h1 className="text-xl font-bold text-textPrimary">Profile</h1>
        <p className="text-textSecondary text-sm mt-1">Manage your personal info and records</p>
      </div>

      {/* Avatar + name */}
      <div className="card flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl font-bold flex-shrink-0">
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <div>
          <p className="text-lg font-semibold text-textPrimary">{user?.name}</p>
          <p className="text-sm text-textMuted">{user?.email}</p>
        </div>
      </div>

      {/* Edit profile */}
      <div className="card">
        <h2 className="text-base font-semibold text-textPrimary mb-4">Personal Information</h2>
        <form onSubmit={handleSave} className="space-y-4">
          {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-3 py-2">{error}</div>}
          <div>
            <label className="block text-xs font-medium text-textSecondary mb-1.5">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="input-field" />
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
              <input name="age" type="number" min="13" max="120" value={form.age} onChange={handleChange} placeholder="—" className="input-field" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" disabled={saving} className="btn-primary text-sm flex items-center gap-2">
              {saving && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Save Changes
            </button>
            {msg && <span className="text-sm text-green-400">{msg}</span>}
          </div>
        </form>
      </div>

      {/* PR Section */}
      <PRSection profile={user} onUpdate={updateUser} />
    </div>
  );
}
