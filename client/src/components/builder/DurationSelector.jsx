import { useWorkout } from '../../context/WorkoutContext';

export default function DurationSelector() {
  const { targetDuration, setTargetDuration } = useWorkout();
  const options = [30, 60];

  return (
    <div className="flex gap-2">
      {options.map((d) => (
        <button
          key={d}
          onClick={() => setTargetDuration(d)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
            targetDuration === d
              ? 'bg-accent text-white border-accent'
              : 'border-border text-textSecondary hover:text-textPrimary hover:border-accent/40'
          }`}
        >
          {d} min
        </button>
      ))}
    </div>
  );
}
