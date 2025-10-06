import express from 'express'
import { books } from '../controllers/booksController.js';
import { addBooks } from '../controllers/booksController.js';
import { targetBook } from '../controllers/booksController.js';
const router = express.Router();

router.post('/addbooks',addBooks);
router.get('/books',books)
router.get('/books/:id',targetBook)

// router.get('/books/:id/chapters/:chapterId') // chapter id ??

export default router;