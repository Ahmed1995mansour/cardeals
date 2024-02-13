import express from 'express';
import { createTrade, getTrades } from '../controllers/trade.controller.js';
import { verifyToken } from '../utiis/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createTrade);
router.get('/get', verifyToken, getTrades);

export default router;
