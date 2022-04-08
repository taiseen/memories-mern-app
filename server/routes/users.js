import express from 'express';
import { signUp, signIn } from '../controllers/users.js';

const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);

// why .post ?
// .post ==> because user send some data to server | backend...
// .post ==> all of the input values of form, send to the backend...
export default router;