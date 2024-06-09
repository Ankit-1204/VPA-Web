const dotenv= require('dotenv').config();
const express=require('express');
const cors= require('cors')
const {mongoose }=require('mongoose');
const cookieParser= require('cookie-parser')
const dialogRoute=require('./routes/dialogRoutes');
const eventRoutes=require('./routes/eventRoutes')
const authRouter =require("./routes/authRoutes")
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


app.use('/events',eventRoutes)
app.use('/api',dialogRoute);
app.use('/auth',authRouter);
const port=8000;
app.listen(port,()=>console.log('Server is Running on port ${port}'))