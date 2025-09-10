import express from 'express';
import connectDB  from '../db/index.js';
import userRoutes from "../routes/userRoute.js";

const app = new express();

app.get('/',(req,res)=>{
    res.send('HELLO');
})

app.use('/users', userRoutes)

await connectDB();