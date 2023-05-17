const express = require('express')
const router = express.Router();
require("dotenv").config();
const userControllers=require('../controllers/commentController')
const Comment=require('../models/comment')

router.post("/newComment",userControllers.newComment) ;


module.exports=router ;