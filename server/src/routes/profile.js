const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const { getProfile, updateProfile, addPR, deletePR } = require('../controllers/profileController');

router.use(authenticate);
router.get('/', getProfile);
router.put('/', updateProfile);
router.post('/prs', addPR);
router.delete('/prs/:prId', deletePR);

module.exports = router;
