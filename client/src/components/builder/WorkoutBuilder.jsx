import { useState } from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import MuscleGroupSelector from './MuscleGroupSelector';
import DurationSelector from './DurationSelector';
import TimeDisplay from './TimeDisplay';
import WorkoutFlow from './WorkoutFlow';
import ExerciseLibrary from '../exercises/ExerciseLibrary';
import api from '../../api';

export default function WorkoutBuilder() {
  const {
    workoutName, setWorkoutName,
    flowExercises,
    muscleGroup, subFocus,
    targetDuration,
    editingWorkoutId,
    resetWorkout,
  } = useWorkout();

  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [saveError, setSaveError] = useState('');

  const handleSave = async () => {
    if (!workoutName.trim()) {
      setSaveError('Please enter a workout name');
      return;
    }
    if (flowExercises.length === 0) {
      setSaveError('Add at least one exercise');
      return;
    }
    setSaveError('');
    setSaving(true);
    try {
      const payload = {
        name: workoutName.trim(),
        muscleGroup,
        subFocus,
        targetDuration,
        exercises: flowExercises,
      };
      if (editingWorkoutId) {
        await api.put(`/workouts/${editingWorkoutId}`, payload);
      } else {
        await api.post('/workouts', payload);
      }
      setSaveMsg(editingWorkoutId ? 'Workout updated!' : 'Workout saved!');
      window.dispatchEvent(new Event('workoutSaved'));
      setTimeout(() => setSaveMsg(''), 3000);
    } catch (err) {
      setSaveError(err.response?.data?.error || 'Failed to save workout');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header toolbar */}
      <div className="px-6 py-4 border-b border-border bg-surface-100 flex flex-wrap gap-4 items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-textPrimary">Workout Builder</h1>
          <p className="text-xs text-textSecondary mt-0.5">Design your routine, track your time</p>
        </div>
        <div className="flex items-center gap-3">
          <TimeDisplay />
          <DurationSelector />
        </div>
      </div>

      {/* Filters row */}
      <div className="px-6 py-3 border-b border-border bg-surface-100/50">
        <MuscleGroupSelector />
      </div>

      {/* Flow area */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {/* Workout name + save */}
        <div className="px-6 pt-5 pb-3 flex flex-wrap gap-3 items-center">
          <input
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="Name your workout..."
            className="input-field max-w-xs text-sm font-medium"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              {saving && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {editingWorkoutId ? 'Update' : 'Save Workout'}
            </button>
            {editingWorkoutId && (
              <button onClick={resetWorkout} className="btn-ghost text-sm">
                New Workout
              </button>
            )}
          </div>
          {saveMsg && <span className="text-sm text-green-400 font-medium">{saveMsg}</span>}
          {saveError && <span className="text-sm text-red-400">{saveError}</span>}
        </div>

        {/* Flow + Library split */}
        <div className="flex-1 overflow-hidden flex flex-col gap-4 px-6 pb-6 min-h-0">
          {/* Flow scroll area */}
          <div className="overflow-x-auto pb-2 flex-shrink-0">
            <WorkoutFlow />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-textMuted font-medium uppercase tracking-wider">Exercise Library</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Exercise Library */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <ExerciseLibrary />
          </div>
        </div>
      </div>
    </div>
  );
}
