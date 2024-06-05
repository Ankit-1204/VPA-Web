const express=require('express');
const {login,signUp}= require('../controllers/authController');
const authRouter=express.Router();

authRouter.post("/signup",signUp);
authRouter.post("/login",login);

module.exports=authRouter