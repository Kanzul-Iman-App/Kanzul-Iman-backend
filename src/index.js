import express from 'express';

const app = new express();
const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('HELLO');
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});