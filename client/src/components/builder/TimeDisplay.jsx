import { useWorkout } from '../../context/WorkoutContext';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

export default function TimeDisplay() {
  const { totalSeconds, targetDuration } = useWorkout();
  const targetSeconds = targetDuration * 60;
  const pct = Math.min(100, (totalSeconds / targetSeconds) * 100);

  const isOver = totalSeconds > targetSeconds;
  const remaining = Math.abs(targetSeconds - totalSeconds);

  let barColor = 'bg-accent';
  if (pct >= 100) barColor = 'bg-red-500';
  else if (pct >= 80) barColor = 'bg-yellow-500';

  return (
    <div className="flex flex-col gap-1.5 min-w-[220px]">
      <div className="flex items-center justify-between text-xs">
        <span className="text-textSecondary font-medium">
          {formatTime(totalSeconds)} / {targetDuration}min
        </span>
        <span className={`font-semibold ${isOver ? 'text-red-400' : 'text-textMuted'}`}>
          {isOver ? `+${formatTime(remaining)} over` : `${formatTime(remaining)} left`}
        </span>
      </div>
      <div className="h-2 bg-surface-50 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
