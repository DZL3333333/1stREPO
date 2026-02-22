/**
 * In-memory data store — swap this module for a real DB adapter (MongoDB/PostgreSQL)
 * without changing any controller logic. Each collection exposes the same CRUD interface.
 */

const users = [];
const workouts = [];
const customExercises = [];

// ─── Generic helpers ────────────────────────────────────────────────────────

function findById(collection, id) {
  return collection.find((item) => item.id === id) || null;
}

function findByField(collection, field, value) {
  return collection.find((item) => item[field] === value) || null;
}

function filterByField(collection, field, value) {
  return collection.filter((item) => item[field] === value);
}

function insert(collection, item) {
  collection.push(item);
  return item;
}

function update(collection, id, updates) {
  const index = collection.findIndex((item) => item.id === id);
  if (index === -1) return null;
  collection[index] = { ...collection[index], ...updates, updatedAt: new Date().toISOString() };
  return collection[index];
}

function remove(collection, id) {
  const index = collection.findIndex((item) => item.id === id);
  if (index === -1) return false;
  collection.splice(index, 1);
  return true;
}

// ─── Users ───────────────────────────────────────────────────────────────────

const UsersStore = {
  findById: (id) => findById(users, id),
  findByEmail: (email) => findByField(users, 'email', email),
  create: (user) => insert(users, user),
  update: (id, updates) => update(users, id, updates),
};

// ─── Workouts ────────────────────────────────────────────────────────────────

const WorkoutsStore = {
  findById: (id) => findById(workouts, id),
  findByUserId: (userId) => filterByField(workouts, 'userId', userId),
  create: (workout) => insert(workouts, workout),
  update: (id, updates) => update(workouts, id, updates),
  delete: (id) => remove(workouts, id),
};

// ─── Custom Exercises ────────────────────────────────────────────────────────

const CustomExercisesStore = {
  findById: (id) => findById(customExercises, id),
  findByUserId: (userId) => filterByField(customExercises, 'userId', userId),
  create: (exercise) => insert(customExercises, exercise),
  update: (id, updates) => update(customExercises, id, updates),
  delete: (id) => remove(customExercises, id),
};

module.exports = { UsersStore, WorkoutsStore, CustomExercisesStore };
