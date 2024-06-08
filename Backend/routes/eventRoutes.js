const express=require('express');
const {schedule}=require('../controllers/eventController');
const eventRouter=express.Router();

eventRouter.post('/schedule',schedule);

module.exports=eventRouter;