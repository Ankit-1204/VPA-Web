const express=require('express');
const {schedule,deleteSchedule}=require('../controllers/eventController');
const eventRouter=express.Router();

eventRouter.post('/schedule',schedule);
eventRouter.post('/delete',deleteSchedule);
module.exports=eventRouter;