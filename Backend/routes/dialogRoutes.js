const express=require ('express');
const {scheduleMeet}=require('../dialogController');
const router =express.Router();

router.post("/webhook",scheduleMeet);

module.exports=router;