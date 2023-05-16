const User = require('../models/user')
const jwt=require('jsonwebtoken') ;
const bcrypt=require('bcryptjs') ;
require("dotenv").config();

const NewUser = async (req, res) => {

    const { user_name, email, password } = req.body;

    //check if the fields are not empty 
    if (!user_name || !email || !password) {
        res.status(400);
        res.json({ message: "please add all fields", status: 400 })
        return;
    }

    //check if user didn't exist
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        res.json({ message: 'user already exist', status: 400 })
        return;
    }

    //Hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user 
    const new_user = await User.create({
        user_name,
        email,
        password:hashedPassword,
    })


    res.status(201).json({
        _id: new_user.id,
        user_name: new_user.user_name,
        email: new_user.email,
    })
}


module.exports = {
    NewUser
}