const express = require('express')
const router = express.Router();
require("dotenv").config();
const eventsController=require('../controllers/eventsController')
const event=require('../models/event')
const {protect}=require('../midleware/authmidleware')


router.post("/newEvent",protect,eventsController.newEvent) ;
router.put('/updateEvent',protect, eventsController.updateEvent);
router.delete("/deleteEvent",protect,eventsController.deleteEvent) ;
router.get("/get3RandomEvents",eventsController.getThreeRandomEvents) ;
router.get("/eventsFilter",eventsController.eventsFilter) ;


module.exports=router ;
