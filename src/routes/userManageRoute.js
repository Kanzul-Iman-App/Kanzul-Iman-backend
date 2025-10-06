import express from 'express'
import { updateProfile } from '../controllers/userManageController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { changePassword } from '../controllers/userManageController.js';



const router = express.Router()


router.put('/user/updateProfile',authMiddleware,updateProfile)
router.put('/user/changePassword',authMiddleware,changePassword)




export default router;