const {Event}=require('../models/event');

const schedule= async(req,res)=>{
    const {data}=req.body;
    const title=data.title;
    const start=data.start;
    const mail=data.mail;
    const teamID=data.teamId;
    const userID=data.id;
    try{
        const response= await Event.create({
            purpose:title,
            date:start,
            users:[userID]
        })
    }catch(error){
        console.log(error);
    }
}

module.exports=schedule;