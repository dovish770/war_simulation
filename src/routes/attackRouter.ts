import express from 'express';
import { getMissiles, getOneMissiles } from '../controllers/missiles/attackController'; 


const router = express.Router();

router.get('/arsenal', getMissiles);
router.get('/attack/:missileName', getOneMissiles);

export default router;

