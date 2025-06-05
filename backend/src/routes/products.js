import express from 'express';
import { createProduct, getProducts } from '../controllers/products.js';

const router = express.Router();
router.get('/', getProducts);
router.post('/', createProduct);

export default router;  