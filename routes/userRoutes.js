const express = require('express')
const router = express.Router();
require("dotenv").config();
const userControllers=require('../controllers/userController')
const User=require('../models/user')
const {protect}=require('../midleware/authmidleware')

router.post("/newUser",protect,userControllers.NewUser) ;
router.post("/login",userControllers.loginUser) ;
router.get("/getMe",protect,userControllers.me) ;
router.delete("/deleteUser",protect,userControllers.deleteUser) ;




module.exports=router ;
