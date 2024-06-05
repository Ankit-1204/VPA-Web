const jwt= require('jsonwebtoken')
const {hashPassword,comparePassword} = require('../helpers/auth');
const {User} = require('../models/user')

const signUp=async (req,res)=>{
    const generateRandomString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      };
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
    
    if(isJoining){
        if(!teamId){
        return res.json({
            error:"Please provide the team ID you are joining"
        })}
        const temp= await User.findOne({team:teamId});
        if(!temp){
            return res.json({
                error:"Please provide a valid team ID"
            }) 
        }

    }
    const exist = await User.findOne({ email: email, team: teamId })
    if(exist){
        return res.json({
            error:"account with same email for this team exist. Please use different email."
        })
    }
    let existingUser = await User.findOne({ firstName: firstName, lastName: lastName, team: teamId });
        if (existingUser) {
            
            let suffix = 1;
            let modifiedLastName = `${lastName}${suffix}`;
            while (await User.findOne({ firstName: firstName, lastName: modifiedLastName, team: teamId })) {
                suffix++;
                modifiedLastName = `${lastName}${suffix}`;
            }
            lastName=modifiedLastName;
        }
    let finalTeamId = teamId;
    if (!isJoining) {
        let unique = false;
        while (!unique) {
          finalTeamId = generateRandomString(10);
          const teamExists = await User.findOne({ team: finalTeamId });
          if (!teamExists) {
            unique = true;
          }
        }
      }
    
    const hashedPassword= await hashPassword(password)
    const user= await User.create({
        firstName:firstName,
        lastName:lastName,
        email:email,
        team:finalTeamId,
        password:hashedPassword
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
    const teamId=user.team;
    const firstName=user.firstName;
    const lastName=user.lastName;
    const hashed=user.password;
    const match=await comparePassword(password,hashed);
    if(!match){
        return res.json({error:'Passwords do not match'})
    }
    else{
        jwt.sign({team:teamId,id:user._id,firstName:firstName,lastName:lastName,email:email},process.env.JWT_SECRET,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json(user)
           })
    }
}catch(error){
    console.log(error);
}
}

module.exports={
    signUp,login
}