import { useWorkout } from '../../context/WorkoutContext';
import { MUSCLE_GROUPS, SUB_FOCUS_MAP } from '../../data/exercises';

export default function MuscleGroupSelector() {
  const { muscleGroup, setMuscleGroup, subFocus, setSubFocus } = useWorkout();

  const handleMuscleGroup = (mg) => {
    setMuscleGroup(mg);
    setSubFocus('');
  };

  const subFocusList = muscleGroup ? SUB_FOCUS_MAP[muscleGroup] || [] : [];

  const groupColors = {
    'Upper Body': 'border-blue-500/40 data-[active=true]:bg-blue-500/15 data-[active=true]:text-blue-400 data-[active=true]:border-blue-500/60',
    'Lower Body': 'border-red-500/40 data-[active=true]:bg-red-500/15 data-[active=true]:text-red-400 data-[active=true]:border-red-500/60',
    'Full Body':  'border-green-500/40 data-[active=true]:bg-green-500/15 data-[active=true]:text-green-400 data-[active=true]:border-green-500/60',
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Muscle Group */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-textMuted uppercase tracking-wider">Target Group</span>
        <div className="flex gap-2">
          {MUSCLE_GROUPS.map((mg) => (
            <button
              key={mg}
              data-active={muscleGroup === mg}
              onClick={() => handleMuscleGroup(mg)}
              className={`px-3 py-1.5 rounded-lg text-sm border text-textSecondary transition-colors ${groupColors[mg] || 'border-border hover:border-accent/40 hover:text-textPrimary'}`}
            >
              {mg}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-focus */}
      {subFocusList.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-textMuted uppercase tracking-wider">Sub-focus</span>
          <div className="flex flex-wrap gap-2">
            {subFocusList.map((sf) => (
              <button
                key={sf}
                onClick={() => setSubFocus(sf === subFocus ? '' : sf)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                  subFocus === sf
                    ? 'bg-accent/15 text-accent border-accent/50'
                    : 'border-border text-textSecondary hover:text-textPrimary hover:border-accent/40'
                }`}
              >
                {sf}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
