const express = require('express')
const router = express.Router();
require("dotenv").config();
const commentControllers=require('../controllers/commentController')
const Comment=require('../models/comment')
const {protect}=require('../midleware/authmidleware')


router.post("/newComment",commentControllers.newComment) ;
router.get("/getComments",commentControllers.getComments) ;
router.get("/getLastThreeComments",commentControllers.getLastT3Comments) ;
router.get("/getNbComments",protect,commentControllers.getTotalCommentCount) ;



module.exports=router ;