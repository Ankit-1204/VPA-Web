const mongoose=require('mongoose');
const {Schema}=mongoose

const eventsSchema=new Schema({
    purpose:String,
    date:Date,
    users:[{type:Schema.Types.ObjectId, ref:'users'}]
})
const Event=mongoose.model('events',eventsSchema);
module.exports=Event;