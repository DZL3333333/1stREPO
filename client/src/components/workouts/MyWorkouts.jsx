import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkout } from '../../context/WorkoutContext';
import api from '../../api';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function calcWorkoutTotal(exercises) {
  return exercises.reduce((acc, e) => {
    return acc + e.sets * e.estimatedTimePerSet + Math.max(0, e.sets - 1) * e.restPeriod;
  }, 0);
}

const muscleGroupColor = {
  'Upper Body': 'bg-blue-500/15 text-blue-400',
  'Lower Body': 'bg-red-500/15 text-red-400',
  'Full Body':  'bg-green-500/15 text-green-400',
};

export default function MyWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const { loadWorkout } = useWorkout();
  const navigate = useNavigate();

  const fetchWorkouts = async () => {
    try {
      const res = await api.get('/workouts');
      setWorkouts(res.data.workouts);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleEdit = (workout) => {
    loadWorkout(workout);
    navigate('/');
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this workout?')) return;
    setDeletingId(id);
    try {
      await api.delete(`/workouts/${id}`);
      setWorkouts((prev) => prev.filter((w) => w.id !== id));
      window.dispatchEvent(new Event('workoutSaved'));
    } catch {
      // ignore
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-textPrimary">My Workouts</h1>
        <p className="text-textSecondary text-sm mt-1">{workouts.length} saved routine{workouts.length !== 1 ? 's' : ''}</p>
      </div>

      {workouts.length === 0 ? (
        <div className="card text-center py-16">
          <span className="text-4xl">&#127947;</span>
          <p className="text-textSecondary mt-3 font-medium">No workouts saved yet</p>
          <p className="text-textMuted text-sm mt-1">Head to the Builder to create your first routine</p>
          <button onClick={() => navigate('/')} className="btn-primary mt-4 text-sm">
            Open Builder
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workouts.map((w) => {
            const totalSec = calcWorkoutTotal(w.exercises || []);
            const badgeClass = muscleGroupColor[w.muscleGroup] || 'bg-surface-50 text-textSecondary';
            return (
              <div key={w.id} className="card flex flex-col gap-3 hover:border-accent/30 transition-colors">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-base font-semibold text-textPrimary">{w.name}</h2>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      {w.muscleGroup && (
                        <span className={`badge ${badgeClass}`}>{w.muscleGroup}</span>
                      )}
                      {w.subFocus && (
                        <span className="badge bg-surface-50 text-textSecondary">{w.subFocus}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-accent">{formatTime(totalSec)}</p>
                    <p className="text-xs text-textMuted">Target: {w.targetDuration}min</p>
                  </div>
                </div>

                {/* Exercise list */}
                <div className="space-y-1">
                  {(w.exercises || []).slice(0, 5).map((ex, i) => (
                    <div key={i} className="flex items-center justify-between text-xs text-textSecondary">
                      <span className="truncate">{ex.name}</span>
                      <span className="flex-shrink-0 ml-2 text-textMuted">{ex.sets}×{ex.reps}{ex.weight ? ` @ ${ex.weight}lbs` : ''}</span>
                    </div>
                  ))}
                  {(w.exercises?.length || 0) > 5 && (
                    <p className="text-xs text-textMuted">+{w.exercises.length - 5} more exercises</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1 border-t border-border">
                  <button onClick={() => handleEdit(w)} className="btn-ghost text-xs flex-1 text-center">
                    Edit Workout
                  </button>
                  <button
                    onClick={() => handleDelete(w.id)}
                    disabled={deletingId === w.id}
                    className="btn-danger text-xs"
                  >
                    {deletingId === w.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
