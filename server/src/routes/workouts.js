const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');

router.use(authenticate);
router.get('/', getWorkouts);
router.get('/:id', getWorkout);
router.post('/', createWorkout);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;
