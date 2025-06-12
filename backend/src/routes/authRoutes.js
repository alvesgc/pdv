import express from "express";
<<<<<<< HEAD
import { login } from "../controllers/auth/loginController.js";
import { register } from "../controllers/auth/registerController.js";
=======
import { login } from "../controllers/auth/authController.js";
>>>>>>> 9dbf01a (feat: implement authentication with login and JWT token generation)

const router = express.Router();

router.post("/login", login);

<<<<<<< HEAD
router.post('/register', register);
=======
>>>>>>> 9dbf01a (feat: implement authentication with login and JWT token generation)
export default router;