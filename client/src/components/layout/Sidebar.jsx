import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWorkout } from '../../context/WorkoutContext';
import api from '../../api';

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    end={to === '/'}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
        isActive
          ? 'bg-accent/15 text-accent'
          : 'text-textSecondary hover:text-textPrimary hover:bg-surface-50'
      }`
    }
  >
    <span className="text-base">{icon}</span>
    {label}
  </NavLink>
);

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { loadWorkout, resetWorkout } = useWorkout();
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [search, setSearch] = useState('');

  const fetchWorkouts = async () => {
    try {
      const res = await api.get('/workouts');
      setWorkouts(res.data.workouts);
    } catch {
      // silently fail if server is down
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Re-fetch when window gains focus (after save)
  useEffect(() => {
    const handler = () => fetchWorkouts();
    window.addEventListener('workoutSaved', handler);
    return () => window.removeEventListener('workoutSaved', handler);
  }, []);

  const filtered = workouts.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleWorkoutClick = (workout) => {
    loadWorkout(workout);
    navigate('/');
    onClose?.();
  };

  const handleNewWorkout = () => {
    resetWorkout();
    navigate('/');
    onClose?.();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-surface-100 border-r border-border flex flex-col z-30
          transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-border">
          <span className="text-2xl">&#127947;</span>
          <span className="text-lg font-bold text-textPrimary tracking-tight">IronFlow</span>
        </div>

        {/* Nav */}
        <nav className="px-2 pt-3 space-y-0.5">
          <NavItem to="/" icon="&#9874;" label="Builder" />
          <NavItem to="/workouts" icon="&#128203;" label="My Workouts" />
          <NavItem to="/profile" icon="&#128100;" label="Profile" />
        </nav>

        {/* Saved workouts */}
        <div className="flex flex-col flex-1 min-h-0 mt-4 border-t border-border pt-3">
          <div className="px-3 pb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-wider">Saved Workouts</span>
            <button
              onClick={handleNewWorkout}
              className="text-textMuted hover:text-accent transition-colors p-1 rounded"
              title="New Workout"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="px-3 mb-2">
            <div className="relative">
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search workouts..."
                className="w-full bg-surface-200 border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-textPrimary placeholder-textMuted focus:outline-none focus:border-accent/40"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
            {filtered.length === 0 ? (
              <p className="text-xs text-textMuted px-2 py-3 text-center">
                {search ? 'No results' : 'No saved workouts yet'}
              </p>
            ) : (
              filtered.map((w) => (
                <button
                  key={w.id}
                  onClick={() => handleWorkoutClick(w)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-50 transition-colors group"
                >
                  <p className="text-sm text-textSecondary group-hover:text-textPrimary truncate">{w.name}</p>
                  <p className="text-xs text-textMuted mt-0.5">
                    {w.exercises?.length || 0} exercises &middot; {w.targetDuration}min
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* User footer */}
        <div className="border-t border-border px-3 py-3 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold flex-shrink-0">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-textPrimary truncate">{user?.name}</p>
          </div>
          <button onClick={logout} className="text-textMuted hover:text-red-400 transition-colors p-1 rounded" title="Sign out">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}
