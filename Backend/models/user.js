const mongoose=require('mongoose');
const {Schema}=mongoose
const userSchema=new Schema({
    firstName:String,
    lastName:String,
    email:String,
    team:String, 
    password:String,
    remainder:[{type:Schema.Types.ObjectId, ref:'events'}]
})


const teamsSchema=new Schema({
    team:String,
    users:[{type:Schema.Types.ObjectId,ref:'users'}]
})

const User=mongoose.model('users',userSchema);
const Team=mongoose.model('teams',teamsSchema);


module.exports={User,Team};