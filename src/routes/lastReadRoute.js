import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { lastreadProgress } from '../controllers/lastReadController.js'
import { getlastreadProgress } from '../controllers/lastReadController.js'
const router = express.Router()


router.post('/user/reading-progress',authMiddleware,lastreadProgress)
router.get('/user/reading-progress',authMiddleware,getlastreadProgress)


export default router