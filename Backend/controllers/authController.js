import jwt from 'jsonwebtoken'
import {hashPassword,comparePassword} from '../helpers/auth';
import {User} from '../models/user'

const signUp=async (req,res)=>{
    try {
    const {firstName,lastName,email,password,isJoining,teamId}=req.body;
    if(!firstName || !lastName || !email){
        return res.json({
            error:"Provide all data please"
        })
    }
    if(!password || password.length<6){
        return res.json({
            error:"Password is required and should be 6 characters long"
        })
    }
    if(isJoining && !teamId){
        return res.json({
            error:"Please provide the team ID you are joining"
        })
    }
    const exist = await User.findOne({ email: email, team: teamId })
    if(exist){
        return res.json({
            error:"account with same email for this team exist. Please use different email."
        })
    }
    const hashedPassword= await hashPassword(password)
    const user= await User.create({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hashedPassword,
        teamId:teamId
    })
    return res.json(user)
} catch (error){
    console.log(error);
}
}

const login= async(req,res)=>{
    try{
    const {email,password}=req.body;
    const user= await User.findOne({email});
    if(!email || !password){
        return res.json({
            error:"Please provide email and password"
        })
    }
    if(!user){
        return res.json({
            error:"Profile does not exist"
        })
    }
    const hashed=user.password;
    const match=comparePassword(password,hashed);
    if(!match){
        res.json({error:'Passwords do not match'})
    }
    else{
        jwt.sign({teamId:teamId,id:user._id,firstName:firstName,email:email},process.env.JWT_SECRET,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json(user)
           })
    }
}catch(error){
    console.log(error);
}
}

module.exports={
    signUp
}