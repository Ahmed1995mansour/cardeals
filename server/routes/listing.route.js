import express from 'express';
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from '../controllers/listing.controller.js';
import { verifyToken, admin } from '../utiis/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, admin, createListing);
router.delete('/delete/:id', verifyToken, admin, deleteListing);
router.post('/update/:id', verifyToken, admin, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

export default router;
