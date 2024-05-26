const mongoose=require('mongoose');
const {Schema}=mongoose
const userSchema=new Schema({
    name:String,
    organisation:String,
    department:String,
    remainder:[{type:Schema.Types.ObjectId, ref:'events'}]
})

const eventsSchema=new Schema({
    purpose:String,
    date:Date,
    users:[{type:Schema.Types.ObjectId, ref:'users'}]
})

const User=mongoose.model('user',userSchema);
const Event=mongoose.model('events',eventsSchema);

module.exports(User,Event);