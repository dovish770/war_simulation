import express from 'express';
import { signIn } from '../controllers/connecting/signInController'; 
import { login } from '../controllers/connecting/logInController';

const router = express.Router();

router.post('/signIn', signIn);
router.post('/login' ,login)

export default router;

