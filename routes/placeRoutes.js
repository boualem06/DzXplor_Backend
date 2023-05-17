const express = require('express')
const router = express.Router();
require("dotenv").config();
const placeControllers=require('../controllers/placeController')
const Comment=require('../models/place')
const {protect}=require('../midleware/authmidleware')


router.post("/newPlace",protect,placeControllers.newPlace) ;
router.post("/updatePlace",protect,placeControllers.updatePlace) ;
router.get("/getPlaces",protect,placeControllers.getPlaces) ;


module.exports=router ;
