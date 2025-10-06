import express from 'express';
import { createUser } from '../controllers/userAuthController.js'
import { loginUser } from '../controllers/userAuthController.js'
import { logoutUser } from '../controllers/userAuthController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { getUser } from '../controllers/userAuthController.js';
const router = express.Router();

router.post("/register", createUser)
router.post("/login", loginUser)
router.post("/logout",authMiddleware,logoutUser)
router.get("/me",authMiddleware,getUser)

export default router;