const express=require('express');
const dotenv= require('dotenv').config();
const cors= require('cors')
const {mongoose }=require('mongoose');
const cookieParser= require('cookie-parser')
const app=express();

app.use(cors);
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database connected"))
.catch((err)=>console.log("Not connected",err))


app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))


const port=8000;
app.listen(port,()=>console.log('Server is Running on port ${port}'))