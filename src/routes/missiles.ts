import express from 'express';
import { getMissiles, getOneMissiles } from '../controllers/missiles/missilesController'; 


const router = express.Router();

router.get('/missiles', getMissiles);
router.get('/missiles/:missileName', getOneMissiles);

export default router;

