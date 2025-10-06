import express from 'express';
import connectDB  from './db/index.js';
import userRoutes from "./routes/userAuthRoute.js";
import booksRoutes from "./routes/booksRoute.js"
import userManageRoutes from "./routes/userManageRoute.js"
import lastReadRoutes from './routes/lastReadRoute.js'
import dotenv from 'dotenv';

// Import all models to register them with mongoose
import './db/User.model.js';
import './db/Books.model.js';
import './db/LastRead.model.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('HELLO');
})
app.get('/hello',(req,res)=>{
    res.send('HELLO Raihan');
})

app.use('/api/auth', userRoutes)
app.use('/api',booksRoutes)
app.use('/api',userManageRoutes)
app.use('/api',lastReadRoutes)
// Connect to database and start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        });
    } catch (error) {
        console.log('Error starting server:', error);
    }
};

startServer();

