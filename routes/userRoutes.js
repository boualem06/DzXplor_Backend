const express = require('express')
const router = express.Router();
require("dotenv").config();
const userControllers=require('../controllers/userController')
const User=require('../models/user')

router.post("/newUser",userControllers.NewUser) ;

module.exports=router ;