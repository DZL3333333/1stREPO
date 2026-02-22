import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useWorkout } from '../../context/WorkoutContext';

function formatTime(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

const subFocusColor = {
  Chest:     'bg-blue-500/15 text-blue-400',
  Back:      'bg-green-500/15 text-green-400',
  Shoulders: 'bg-purple-500/15 text-purple-400',
  Arms:      'bg-yellow-500/15 text-yellow-400',
  Legs:      'bg-red-500/15 text-red-400',
  Core:      'bg-orange-500/15 text-orange-400',
  'Full Body':'bg-pink-500/15 text-pink-400',
};

export default function WorkoutCard({ card }) {
  const { updateExercise, removeExercise, calcCardSeconds } = useWorkout();
  const cardSeconds = calcCardSeconds(card);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.uid });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const handleNumericChange = (field, value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0) updateExercise(card.uid, field, num);
  };

  const badgeClass = subFocusColor[card.subFocus] || 'bg-surface-50 text-textSecondary';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative flex-shrink-0 w-56 bg-surface-100 border rounded-xl p-3.5 flex flex-col gap-3
        ${isDragging ? 'border-accent shadow-lg shadow-accent/10' : 'border-border'}
      `}
    >
      {/* Drag handle + title row */}
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 text-textMuted hover:text-textSecondary cursor-grab active:cursor-grabbing p-1 -ml-1 rounded transition-colors flex-shrink-0"
          title="Drag to reorder"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-6 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-textPrimary leading-tight truncate">{card.name}</p>
          <span className={`badge mt-1 ${badgeClass}`}>{card.subFocus}</span>
        </div>
        <button
          onClick={() => removeExercise(card.uid)}
          className="text-textMuted hover:text-red-400 transition-colors p-1 rounded flex-shrink-0"
          title="Remove"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-textMuted">Sets</span>
          <input
            type="number" min="1" max="20"
            value={card.sets}
            onChange={(e) => handleNumericChange('sets', e.target.value)}
            className="input-field text-center text-sm py-1.5"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-textMuted">Reps</span>
          <input
            type="number" min="1" max="100"
            value={card.reps}
            onChange={(e) => handleNumericChange('reps', e.target.value)}
            className="input-field text-center text-sm py-1.5"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-textMuted">Weight (lbs)</span>
          <input
            type="text"
            value={card.weight}
            onChange={(e) => updateExercise(card.uid, 'weight', e.target.value)}
            placeholder="Optional"
            className="input-field text-center text-sm py-1.5"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-textMuted">Rest (sec)</span>
          <input
            type="number" min="0" max="600" step="15"
            value={card.restPeriod}
            onChange={(e) => handleNumericChange('restPeriod', e.target.value)}
            className="input-field text-center text-sm py-1.5"
          />
        </label>
      </div>

      {/* Time */}
      <div className="flex items-center justify-between pt-1 border-t border-border">
        <span className="text-xs text-textMuted">Est. time</span>
        <span className="text-xs font-semibold text-accent">{formatTime(cardSeconds)}</span>
      </div>
    </div>
  );
}
