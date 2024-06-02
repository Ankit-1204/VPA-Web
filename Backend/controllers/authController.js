import jwt from 'jsonwebtoken'
import {hashPassword,comparePassword} from '../helpers/auth';
import {User} from '../models/user'

const signUp=async (req,res)=>{
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
    
}