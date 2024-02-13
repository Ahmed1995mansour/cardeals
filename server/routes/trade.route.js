import express from 'express';
import {
  createTrade,
  getTrade,
  getTrades,
  getAllTrades,
  makeTradeOffer,
  TradeOfferAction,
} from '../controllers/trade.controller.js';
import { admin, verifyToken } from '../utiis/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createTrade);
router.get('/get', verifyToken, getTrades);
router.get('/admin/get', verifyToken, admin, getAllTrades);
router.get('/get/:id', verifyToken, getTrade);
router.put('/admin/make-offer/:id', verifyToken, admin, makeTradeOffer);
router.put('/accept-offer/:id', verifyToken, TradeOfferAction);
router.put('/decline-offer/:id', verifyToken, TradeOfferAction);

export default router;
