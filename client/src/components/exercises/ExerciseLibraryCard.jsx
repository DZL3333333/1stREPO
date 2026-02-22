import { useDraggable } from '@dnd-kit/core';
import { useWorkout } from '../../context/WorkoutContext';

const subFocusColor = {
  Chest:     'bg-blue-500/15 text-blue-400',
  Back:      'bg-green-500/15 text-green-400',
  Shoulders: 'bg-purple-500/15 text-purple-400',
  Arms:      'bg-yellow-500/15 text-yellow-400',
  Legs:      'bg-red-500/15 text-red-400',
  Core:      'bg-orange-500/15 text-orange-400',
  'Full Body':'bg-pink-500/15 text-pink-400',
};

export default function ExerciseLibraryCard({ exercise, onDelete }) {
  const { addExercise } = useWorkout();

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `lib-${exercise.id}`,
    data: { fromLibrary: true, exercise },
  });

  const badgeClass = subFocusColor[exercise.subFocus] || 'bg-surface-50 text-textSecondary';

  return (
    <div
      ref={setNodeRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="group relative bg-surface-50 border border-border rounded-lg px-3 py-2.5 flex items-center gap-3 hover:border-accent/40 transition-colors"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="text-textMuted hover:text-textSecondary cursor-grab active:cursor-grabbing flex-shrink-0"
        title="Drag to add"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-6 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm text-textPrimary font-medium truncate">{exercise.name}</p>
          <span className={`badge ${badgeClass}`}>{exercise.subFocus}</span>
          {exercise.isCustom && (
            <span className="badge bg-accent/15 text-accent">Custom</span>
          )}
        </div>
        <p className="text-xs text-textMuted mt-0.5">
          {exercise.defaultSets} sets &times; {exercise.defaultReps} reps
          &nbsp;&middot;&nbsp;{exercise.defaultRestPeriod}s rest
        </p>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        {exercise.isCustom && onDelete && (
          <button
            onClick={() => onDelete(exercise.id)}
            className="opacity-0 group-hover:opacity-100 text-textMuted hover:text-red-400 transition-all p-1 rounded"
            title="Delete custom exercise"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
        <button
          onClick={() => addExercise(exercise)}
          className="text-textMuted hover:text-accent transition-colors p-1 rounded"
          title="Add to workout"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
