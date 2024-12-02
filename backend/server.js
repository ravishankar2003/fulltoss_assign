import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
dotenv.config()


import authroutes from './routes/authroutes.js'
import productroutes from './routes/productroutes.js'



const app=express()

app.use(cookieParser());
app.use(express.json())


app.use(cors({
  origin: true,
  credentials:true
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('mongodb connected'))
.catch((err)=> console.log(err) );


app.use('/auth', authroutes);
app.use('/user', productroutes);





app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });


app.listen(process.env.PORT||3000, ()=>{
    console.log('server on port 3000')
})
