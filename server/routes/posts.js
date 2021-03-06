import { getPost, getPaginationPosts, getPostsBySearch, createPost, commentPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

// http://localhost:5000/posts/~~~
// these routs we have to access after (posts) prefix...

router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.get('/', getPaginationPosts);

// we want to add auth middleware before user actions...
router.post('/', auth, createPost);
router.post('/:id/commentPost', auth, commentPost);

router.patch('/:id', auth, updatePost);
router.patch('/:id/likePost', auth, likePost);

router.delete('/:id', auth, deletePost);

export default router;  