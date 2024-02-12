import express from 'express';
import { createListing } from '../controllers/listing.controller.js';
import { verifyToken, admin } from '../utiis/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, admin, createListing);

export default router;
