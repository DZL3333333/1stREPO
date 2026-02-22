/**
 * Built-in exercise library — read-only seed data.
 * In a real DB these would be seeded rows in an exercises table.
 */

const EXERCISES = [
  // ── CHEST ─────────────────────────────────────────────────────────────────
  { id: 'bench-press',        name: 'Bench Press',          muscleGroup: 'Upper Body', subFocus: 'Chest',     defaultSets: 3, defaultReps: 10, defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'incline-bench',      name: 'Incline Bench Press',  muscleGroup: 'Upper Body', subFocus: 'Chest',     defaultSets: 3, defaultReps: 10, defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'decline-bench',      name: 'Decline Bench Press',  muscleGroup: 'Upper Body', subFocus: 'Chest',     defaultSets: 3, defaultReps: 10, defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'dumbbell-flyes',     name: 'Dumbbell Flyes',       muscleGroup: 'Upper Body', subFocus: 'Chest',     defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 75, isCustom: false },
  { id: 'push-ups',           name: 'Push-Ups',             muscleGroup: 'Upper Body', subFocus: 'Chest',     defaultSets: 3, defaultReps: 15, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'cable-crossover',    name: 'Cable Crossover',      muscleGroup: 'Upper Body', subFocus: 'Chest',     defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 75, isCustom: false },
  { id: 'chest-dips',         name: 'Chest Dips',           muscleGroup: 'Upper Body', subFocus: 'Chest',     defaultSets: 3, defaultReps: 10, defaultRestPeriod: 60, estimatedTimePerSet: 75, isCustom: false },
  { id: 'pec-deck',           name: 'Pec Deck',             muscleGroup: 'Upper Body', subFocus: 'Chest',     defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 75, isCustom: false },
  { id: 'landmine-press',     name: 'Landmine Press',       muscleGroup: 'Upper Body', subFocus: 'Chest',     defaultSets: 3, defaultReps: 10, defaultRestPeriod: 60, estimatedTimePerSet: 75, isCustom: false },

  // ── BACK ──────────────────────────────────────────────────────────────────
  { id: 'pull-ups',           name: 'Pull-Ups',             muscleGroup: 'Upper Body', subFocus: 'Back',      defaultSets: 3, defaultReps: 8,  defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'lat-pulldown',       name: 'Lat Pulldown',         muscleGroup: 'Upper Body', subFocus: 'Back',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'bent-over-row',      name: 'Bent-Over Row',        muscleGroup: 'Upper Body', subFocus: 'Back',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'seated-cable-row',   name: 'Seated Cable Row',     muscleGroup: 'Upper Body', subFocus: 'Back',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'tbar-row',           name: 'T-Bar Row',            muscleGroup: 'Upper Body', subFocus: 'Back',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'single-arm-row',     name: 'Single-Arm DB Row',    muscleGroup: 'Upper Body', subFocus: 'Back',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 60, estimatedTimePerSet: 90, isCustom: false },
  { id: 'deadlift',           name: 'Deadlift',             muscleGroup: 'Upper Body', subFocus: 'Back',      defaultSets: 3, defaultReps: 5,  defaultRestPeriod: 120, estimatedTimePerSet: 90, isCustom: false },
  { id: 'face-pulls',         name: 'Face Pulls',           muscleGroup: 'Upper Body', subFocus: 'Back',      defaultSets: 3, defaultReps: 15, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'shrugs',             name: 'Barbell Shrugs',       muscleGroup: 'Upper Body', subFocus: 'Back',      defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },

  // ── SHOULDERS ─────────────────────────────────────────────────────────────
  { id: 'ohp',                name: 'Overhead Press',       muscleGroup: 'Upper Body', subFocus: 'Shoulders', defaultSets: 3, defaultReps: 8,  defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'lateral-raises',     name: 'Lateral Raises',       muscleGroup: 'Upper Body', subFocus: 'Shoulders', defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'front-raises',       name: 'Front Raises',         muscleGroup: 'Upper Body', subFocus: 'Shoulders', defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'rear-delt-fly',      name: 'Rear Delt Flyes',      muscleGroup: 'Upper Body', subFocus: 'Shoulders', defaultSets: 3, defaultReps: 15, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'arnold-press',       name: 'Arnold Press',         muscleGroup: 'Upper Body', subFocus: 'Shoulders', defaultSets: 3, defaultReps: 10, defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'cable-lateral',      name: 'Cable Lateral Raises', muscleGroup: 'Upper Body', subFocus: 'Shoulders', defaultSets: 3, defaultReps: 15, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'upright-row',        name: 'Upright Row',          muscleGroup: 'Upper Body', subFocus: 'Shoulders', defaultSets: 3, defaultReps: 10, defaultRestPeriod: 60, estimatedTimePerSet: 75, isCustom: false },
  { id: 'machine-shoulder',   name: 'Machine Shoulder Press',muscleGroup:'Upper Body', subFocus: 'Shoulders', defaultSets: 3, defaultReps: 10, defaultRestPeriod: 60, estimatedTimePerSet: 75, isCustom: false },

  // ── ARMS (BICEPS) ─────────────────────────────────────────────────────────
  { id: 'barbell-curl',       name: 'Barbell Curl',         muscleGroup: 'Upper Body', subFocus: 'Arms',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'dumbbell-curl',      name: 'Dumbbell Curl',        muscleGroup: 'Upper Body', subFocus: 'Arms',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'hammer-curl',        name: 'Hammer Curl',          muscleGroup: 'Upper Body', subFocus: 'Arms',      defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'preacher-curl',      name: 'Preacher Curl',        muscleGroup: 'Upper Body', subFocus: 'Arms',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'concentration-curl', name: 'Concentration Curl',   muscleGroup: 'Upper Body', subFocus: 'Arms',      defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  // ARMS (TRICEPS)
  { id: 'tricep-pushdown',    name: 'Tricep Pushdown',      muscleGroup: 'Upper Body', subFocus: 'Arms',      defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'skull-crushers',     name: 'Skull Crushers',       muscleGroup: 'Upper Body', subFocus: 'Arms',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 60, estimatedTimePerSet: 75, isCustom: false },
  { id: 'overhead-tri-ext',   name: 'Overhead Tricep Ext',  muscleGroup: 'Upper Body', subFocus: 'Arms',      defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'tricep-dips',        name: 'Tricep Dips',          muscleGroup: 'Upper Body', subFocus: 'Arms',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 60, estimatedTimePerSet: 75, isCustom: false },
  { id: 'diamond-pushups',    name: 'Diamond Push-Ups',     muscleGroup: 'Upper Body', subFocus: 'Arms',      defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },

  // ── LEGS ──────────────────────────────────────────────────────────────────
  { id: 'squat',              name: 'Barbell Squat',        muscleGroup: 'Lower Body', subFocus: 'Legs',      defaultSets: 4, defaultReps: 8,  defaultRestPeriod: 120, estimatedTimePerSet: 90, isCustom: false },
  { id: 'leg-press',          name: 'Leg Press',            muscleGroup: 'Lower Body', subFocus: 'Legs',      defaultSets: 3, defaultReps: 12, defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'romanian-dl',        name: 'Romanian Deadlift',    muscleGroup: 'Lower Body', subFocus: 'Legs',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'leg-curl',           name: 'Leg Curl',             muscleGroup: 'Lower Body', subFocus: 'Legs',      defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 75, isCustom: false },
  { id: 'leg-extension',      name: 'Leg Extension',        muscleGroup: 'Lower Body', subFocus: 'Legs',      defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 75, isCustom: false },
  { id: 'calf-raises',        name: 'Calf Raises',          muscleGroup: 'Lower Body', subFocus: 'Legs',      defaultSets: 4, defaultReps: 15, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'lunges',             name: 'Walking Lunges',       muscleGroup: 'Lower Body', subFocus: 'Legs',      defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 75, isCustom: false },
  { id: 'bulgarian-split',    name: 'Bulgarian Split Squat',muscleGroup: 'Lower Body', subFocus: 'Legs',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'hack-squat',         name: 'Hack Squat',           muscleGroup: 'Lower Body', subFocus: 'Legs',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'step-ups',           name: 'Step-Ups',             muscleGroup: 'Lower Body', subFocus: 'Legs',      defaultSets: 3, defaultReps: 12, defaultRestPeriod: 60, estimatedTimePerSet: 75, isCustom: false },

  // ── CORE ──────────────────────────────────────────────────────────────────
  { id: 'plank',              name: 'Plank',                muscleGroup: 'Full Body',  subFocus: 'Core',      defaultSets: 3, defaultReps: 1,  defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'crunches',           name: 'Crunches',             muscleGroup: 'Full Body',  subFocus: 'Core',      defaultSets: 3, defaultReps: 20, defaultRestPeriod: 45, estimatedTimePerSet: 60, isCustom: false },
  { id: 'russian-twists',     name: 'Russian Twists',       muscleGroup: 'Full Body',  subFocus: 'Core',      defaultSets: 3, defaultReps: 20, defaultRestPeriod: 45, estimatedTimePerSet: 60, isCustom: false },
  { id: 'leg-raises',         name: 'Hanging Leg Raises',   muscleGroup: 'Full Body',  subFocus: 'Core',      defaultSets: 3, defaultReps: 15, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'cable-crunches',     name: 'Cable Crunches',       muscleGroup: 'Full Body',  subFocus: 'Core',      defaultSets: 3, defaultReps: 15, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'ab-wheel',           name: 'Ab Wheel Rollout',     muscleGroup: 'Full Body',  subFocus: 'Core',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'mountain-climbers',  name: 'Mountain Climbers',    muscleGroup: 'Full Body',  subFocus: 'Core',      defaultSets: 3, defaultReps: 30, defaultRestPeriod: 45, estimatedTimePerSet: 45, isCustom: false },
  { id: 'side-plank',         name: 'Side Plank',           muscleGroup: 'Full Body',  subFocus: 'Core',      defaultSets: 3, defaultReps: 1,  defaultRestPeriod: 45, estimatedTimePerSet: 45, isCustom: false },
  { id: 'dead-bug',           name: 'Dead Bug',             muscleGroup: 'Full Body',  subFocus: 'Core',      defaultSets: 3, defaultReps: 10, defaultRestPeriod: 45, estimatedTimePerSet: 60, isCustom: false },
  { id: 'bicycle-crunches',   name: 'Bicycle Crunches',     muscleGroup: 'Full Body',  subFocus: 'Core',      defaultSets: 3, defaultReps: 20, defaultRestPeriod: 45, estimatedTimePerSet: 60, isCustom: false },

  // ── FULL BODY COMPOUNDS ───────────────────────────────────────────────────
  { id: 'burpees',            name: 'Burpees',              muscleGroup: 'Full Body',  subFocus: 'Full Body', defaultSets: 3, defaultReps: 10, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'kettlebell-swing',   name: 'Kettlebell Swing',     muscleGroup: 'Full Body',  subFocus: 'Full Body', defaultSets: 3, defaultReps: 15, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
  { id: 'clean-and-press',    name: 'Clean & Press',        muscleGroup: 'Full Body',  subFocus: 'Full Body', defaultSets: 3, defaultReps: 8,  defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'thruster',           name: 'Thruster',             muscleGroup: 'Full Body',  subFocus: 'Full Body', defaultSets: 3, defaultReps: 10, defaultRestPeriod: 90, estimatedTimePerSet: 90, isCustom: false },
  { id: 'box-jumps',          name: 'Box Jumps',            muscleGroup: 'Full Body',  subFocus: 'Full Body', defaultSets: 3, defaultReps: 10, defaultRestPeriod: 60, estimatedTimePerSet: 60, isCustom: false },
];

module.exports = EXERCISES;
