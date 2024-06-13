const {Event}=require('../models/event');
const {User}=require('../models/user')
const schedule= async(req,res)=>{
    const data=req.body;
    const title=data.title;
    const start=data.start;
    const mail=data.mail;
    const teamID=data.teamId;
    const userID=data.id;
    try{
        const event= await Event.create({
            purpose:title,
            date:start,
            users:[userID]
        })
        const user=await User.findOneAndUpdate(
            {email:mail,team: teamID},
            
            {
                $push:{remainder:event._id}
            }
        )
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        console.log(12)
        res.status(200).send({ message: "Event scheduled and user updated", event:event });
    }catch(error){
        console.log(error);
    }
}
const deleteSchedule= async (req,res)=>{
    try{

    }catch(err){
        console.log(err);
    }
}
module.exports={schedule};