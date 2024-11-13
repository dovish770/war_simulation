import express from 'express';
import { getInterceptors, getOneInterceptor } from '../controllers/missiles/defenceController'; 


const router = express.Router();

router.get('/defence', getInterceptors);
router.get('/defence/:missileName', getOneInterceptor);

export default router;

