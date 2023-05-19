const express = require('express')
const router = express.Router();
require("dotenv").config();
const placeControllers=require('../controllers/placeController')
const Comment=require('../models/place')
const {protect}=require('../midleware/authmidleware')


router.post("/newPlace",protect,placeControllers.newPlace) ;
router.post("/updatePlace",protect,placeControllers.updatePlace) ;
router.get("/getPlaces",protect,placeControllers.getPlaces) ;
router.delete("/deletePlace",protect,placeControllers.deletePlace) ;
router.get('/place/:placeId',placeControllers.getPlace);
router.get("/getMostViewedPlaces",placeControllers.getMostViewedPlaces) ;
router.get('/NumberCommentByPlace/:placeId', placeControllers.numberOfCommentstByPlace);
router.get('/getPlaces/:index', placeControllers.getPlacesAfterIndex);




module.exports=router ;
