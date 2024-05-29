const dotenv= require('dotenv').config();
const express=require('express');
const cors= require('cors')
const {mongoose }=require('mongoose');
const cookieParser= require('cookie-parser')
const bodyParser=require('body-parser')
const app=express();



const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  };
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database connected"))
.catch((err)=>console.log("Not connected",err))




const dialogRoute=require('./routes/dialogRoutes');
app.use('/api',dialogRoute);
const port=8000;
app.listen(port,()=>console.log('Server is Running on port ${port}'))