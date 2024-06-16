const {Event}=require('../models/event');
const {User}=require('../models/user')
const schedule= async(req,res)=>{
    const data=req.body;
    const title=data.title;
    const start=data.start;
    const mail=data.mail;
    const teamID=data.teamId;
    const userIDs=data.id;
    try{
        const event= await Event.create({
            purpose:title,
            date:start,
            users:userIDs
        })
        
        for (const userID of userIDs) {
            await User.findOneAndUpdate(
                { _id: userID, team: teamID },
                { $push: { remainder: event._id } }
            );
        }
        

        console.log(12)
        res.status(200).send({ message: "Event scheduled and users updated", event: event });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error scheduling event", error: error.message });
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