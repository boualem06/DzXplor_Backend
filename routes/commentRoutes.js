const express = require('express')
const router = express.Router();
require("dotenv").config();
const commentControllers=require('../controllers/commentController')
const Comment=require('../models/comment')

router.post("/newComment",commentControllers.newComment) ;
router.get("/getComments",commentControllers.getComments) ;
router.get("/getLastThreeComments",commentControllers.getLastT3Comments) ;



module.exports=router ;