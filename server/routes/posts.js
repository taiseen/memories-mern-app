import express from 'express';
import auth from '../middleware/auth.js';
import { getPost, getPostsBySearch, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

const router = express.Router();

// http://localhost:5000/posts

router.get('/', getPost);
router.get('/search', getPostsBySearch);

router.post('/', auth, createPost);

router.patch('/:id', auth, updatePost);
router.patch('/:id/likePost', auth, likePost);

router.delete('/:id', auth, deletePost);

export default router;  