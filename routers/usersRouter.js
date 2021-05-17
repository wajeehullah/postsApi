const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.get('/', auth.authenticate, auth.authorize('admin'), userController.getUsers);
router.get('/:userId', auth.authenticate, auth.authorize('admin'), userController.getUserById);
router.post('/:userId', auth.authenticate, auth.authorize('admin'), userController.saveUser);

module.exports = router;