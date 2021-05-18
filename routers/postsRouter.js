const express = require('express');
const postsController = require('../controllers/postsController');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth.authenticate, postsController.getPosts);
router.post('/', auth.authenticate, postsController.createPost);
router.get('/:postId', auth.authenticate, postsController.getPostById);
router.delete('/:postId', auth.authenticate, postsController.deletePost);
router.put('/:postId', auth.authenticate, postsController.updatePost);

module.exports = router;