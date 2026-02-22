const { v4: uuidv4 } = require('uuid');
const EXERCISES = require('../data/exercises');
const { CustomExercisesStore } = require('../data/store');

function getExercises(req, res) {
  const custom = CustomExercisesStore.findByUserId(req.userId);
  res.json({ exercises: [...EXERCISES, ...custom] });
}

function createCustomExercise(req, res) {
  const { name, muscleGroup, subFocus, defaultSets, defaultReps, defaultRestPeriod, estimatedTimePerSet } = req.body;
  if (!name || !muscleGroup || !subFocus) {
    return res.status(400).json({ error: 'Name, muscleGroup, and subFocus are required' });
  }
  const exercise = CustomExercisesStore.create({
    id: uuidv4(),
    userId: req.userId,
    name,
    muscleGroup,
    subFocus,
    defaultSets: Number(defaultSets) || 3,
    defaultReps: Number(defaultReps) || 10,
    defaultRestPeriod: Number(defaultRestPeriod) || 60,
    estimatedTimePerSet: Number(estimatedTimePerSet) || 75,
    isCustom: true,
    createdAt: new Date().toISOString(),
  });
  res.status(201).json({ exercise });
}

function deleteCustomExercise(req, res) {
  const exercise = CustomExercisesStore.findById(req.params.id);
  if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
  if (exercise.userId !== req.userId) return res.status(403).json({ error: 'Forbidden' });
  CustomExercisesStore.delete(req.params.id);
  res.json({ success: true });
}

module.exports = { getExercises, createCustomExercise, deleteCustomExercise };
