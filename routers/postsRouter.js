const express = require('express');
const postsController = require('../controllers/postsController');
const router = express.Router();
const auth = require('../middlewares/auth');
router.get('/', auth.authenticate, postsController.getPosts);
router.get('/:postId', auth.authenticate, postsController.getPostById);

module.exports = router;