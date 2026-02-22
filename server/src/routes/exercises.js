const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const { getExercises, createCustomExercise, deleteCustomExercise } = require('../controllers/exerciseController');

router.use(authenticate);
router.get('/', getExercises);
router.post('/custom', createCustomExercise);
router.delete('/custom/:id', deleteCustomExercise);

module.exports = router;
