const express = require('express')
const router = express.Router();
require("dotenv").config();
const placeControllers=require('../controllers/placeController')
const Comment=require('../models/place')
const {protect}=require('../midleware/authmidleware')


router.post("/newPlace",protect,placeControllers.newPlace) ;
router.post("/updatePlace",protect,placeControllers.updatePlace) ;
router.get("/getPlaces",placeControllers.getPlaces) ;
router.delete("/deletePlace",protect,placeControllers.deletePlace) ;
router.get("/placeFilter/:category/:state/:place_title", placeControllers.placeFilter);
router.get('/place/:placeId',placeControllers.getPlace);
router.get("/getMostViewedPlaces",placeControllers.getMostViewedPlaces) ;
router.get('/NumberCommentByPlace/:placeId', placeControllers.numberOfCommentstByPlace);
router.get('/getPlaces/:index',protect, placeControllers.getPlacesAfterIndex);




module.exports=router ;
