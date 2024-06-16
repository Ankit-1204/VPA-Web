const express=require('express');
const {login,signUp,logout,profile}= require('../controllers/authController');
const authRouter=express.Router();

authRouter.post("/signup",signUp);
authRouter.post("/login",login);
authRouter.get("/profile",profile);
authRouter.post("/logout",logout);
module.exports=authRouter;

