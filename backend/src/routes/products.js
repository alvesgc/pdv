import express from "express";
import { createProduct, getProducts } from "../controllers/products.js";
import authenticate from "../middleware/authMiddleware.js"

const router = express.Router();
router.get("/", authenticate, getProducts);
router.post("/", authenticate, createProduct);

export default router;
