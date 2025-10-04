import express from 'express';
import { createUser } from '../controllers/userController.js'
import { loginUser } from '../controllers/userController.js'
import { logoutUser } from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { getUser } from '../controllers/userController.js';
const router = express.Router();

router.post("/register", createUser)
router.post("/login", loginUser)
router.post("/logout",authMiddleware,logoutUser)
router.get("/me",authMiddleware,getUser)

export default router;