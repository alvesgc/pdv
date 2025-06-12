import express from "express";
import { login } from "../controllers/auth/loginController.js";
import { register } from "../controllers/auth/registerController.js";

const router = express.Router();

router.post("/login", login);

router.post('/register', register);
export default router;