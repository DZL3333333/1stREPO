const { v4: uuidv4 } = require('uuid');
const { WorkoutsStore } = require('../data/store');

function getWorkouts(req, res) {
  const workouts = WorkoutsStore.findByUserId(req.userId);
  res.json({ workouts });
}

function getWorkout(req, res) {
  const workout = WorkoutsStore.findById(req.params.id);
  if (!workout) return res.status(404).json({ error: 'Workout not found' });
  if (workout.userId !== req.userId) return res.status(403).json({ error: 'Forbidden' });
  res.json({ workout });
}

function createWorkout(req, res) {
  const { name, muscleGroup, subFocus, targetDuration, exercises } = req.body;
  if (!name) return res.status(400).json({ error: 'Workout name is required' });
  const workout = WorkoutsStore.create({
    id: uuidv4(),
    userId: req.userId,
    name,
    muscleGroup: muscleGroup || '',
    subFocus: subFocus || '',
    targetDuration: targetDuration || 60,
    exercises: exercises || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  res.status(201).json({ workout });
}

function updateWorkout(req, res) {
  const workout = WorkoutsStore.findById(req.params.id);
  if (!workout) return res.status(404).json({ error: 'Workout not found' });
  if (workout.userId !== req.userId) return res.status(403).json({ error: 'Forbidden' });

  const { name, muscleGroup, subFocus, targetDuration, exercises } = req.body;
  const updated = WorkoutsStore.update(req.params.id, {
    name: name ?? workout.name,
    muscleGroup: muscleGroup ?? workout.muscleGroup,
    subFocus: subFocus ?? workout.subFocus,
    targetDuration: targetDuration ?? workout.targetDuration,
    exercises: exercises ?? workout.exercises,
  });
  res.json({ workout: updated });
}

function deleteWorkout(req, res) {
  const workout = WorkoutsStore.findById(req.params.id);
  if (!workout) return res.status(404).json({ error: 'Workout not found' });
  if (workout.userId !== req.userId) return res.status(403).json({ error: 'Forbidden' });
  WorkoutsStore.delete(req.params.id);
  res.json({ success: true });
}

module.exports = { getWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout };
