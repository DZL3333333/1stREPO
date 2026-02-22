import { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const WorkoutContext = createContext(null);

export function WorkoutProvider({ children }) {
  const [flowExercises, setFlowExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [subFocus, setSubFocus] = useState('');
  const [targetDuration, setTargetDuration] = useState(60);
  const [editingWorkoutId, setEditingWorkoutId] = useState(null);

  // Calculate total seconds for a single flow card
  const calcCardSeconds = useCallback((card) => {
    const { sets, estimatedTimePerSet, restPeriod } = card;
    return sets * estimatedTimePerSet + Math.max(0, sets - 1) * restPeriod;
  }, []);

  // Total workout seconds
  const totalSeconds = flowExercises.reduce((acc, card) => acc + calcCardSeconds(card), 0);

  const addExercise = useCallback((exercise) => {
    setFlowExercises((prev) => [
      ...prev,
      {
        uid: uuidv4(),
        exerciseId: exercise.id,
        name: exercise.name,
        muscleGroup: exercise.muscleGroup,
        subFocus: exercise.subFocus,
        sets: exercise.defaultSets,
        reps: exercise.defaultReps,
        weight: '',
        restPeriod: exercise.defaultRestPeriod,
        estimatedTimePerSet: exercise.estimatedTimePerSet,
      },
    ]);
  }, []);

  const removeExercise = useCallback((uid) => {
    setFlowExercises((prev) => prev.filter((e) => e.uid !== uid));
  }, []);

  const updateExercise = useCallback((uid, field, value) => {
    setFlowExercises((prev) =>
      prev.map((e) => (e.uid === uid ? { ...e, [field]: value } : e))
    );
  }, []);

  const reorderExercises = useCallback((newOrder) => {
    setFlowExercises(newOrder);
  }, []);

  const loadWorkout = useCallback((workout) => {
    setEditingWorkoutId(workout.id);
    setWorkoutName(workout.name);
    setMuscleGroup(workout.muscleGroup || '');
    setSubFocus(workout.subFocus || '');
    setTargetDuration(workout.targetDuration || 60);
    setFlowExercises(
      workout.exercises.map((e) => ({ ...e, uid: e.uid || uuidv4() }))
    );
  }, []);

  const resetWorkout = useCallback(() => {
    setEditingWorkoutId(null);
    setWorkoutName('');
    setMuscleGroup('');
    setSubFocus('');
    setTargetDuration(60);
    setFlowExercises([]);
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        flowExercises,
        workoutName, setWorkoutName,
        muscleGroup, setMuscleGroup,
        subFocus, setSubFocus,
        targetDuration, setTargetDuration,
        editingWorkoutId,
        totalSeconds,
        calcCardSeconds,
        addExercise,
        removeExercise,
        updateExercise,
        reorderExercises,
        loadWorkout,
        resetWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error('useWorkout must be used inside WorkoutProvider');
  return ctx;
}
