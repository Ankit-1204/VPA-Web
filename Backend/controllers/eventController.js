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
    try {
        const { event } = req.body;

        for (const ev of event) {
            const eventId = ev._id;
            const userIds = ev.users;

            await Event.findByIdAndDelete(eventId);

            for (const userId of userIds) {
                await User.findByIdAndUpdate(userId, {
                    $pull: { events: eventId }
                });
            }
        }

        res.status(200).json({ message: 'Events and user references deleted successfully' });
    } catch (error) {
        console.error('Error deleting schedule:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports={schedule,deleteSchedule};