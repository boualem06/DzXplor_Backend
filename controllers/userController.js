const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
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
        password: hashedPassword,
    })

    // Create a Nodemailer transporter
    // const transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //         user: 'DzXplore.web@gmail.com',
    //         pass: 'dzxploreweb',
    //     },
    // });

    // // Prepare the email content
    // const mailOptions = {
    //     from: 'DzXplore.web@gmail.com',
    //     to: email,
    //     subject: 'DzXplore credentials',
    //     html:`<p>Your account in  <strong>DzXplore</strong> is created <br><br> your username is :<strong>${user_name}</strong> <br>your  email is :<strong>${email}</strong> <br>your password is :<strong>${password} </strong><br><br> <strong>Please change you password !</strong></p>`,
      
    // };

    // // Send the email
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.log(error);
    //         res.status(500).send('Error sending email');
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //         res.send('Email sent successfully');
    //     }
    // });

    res.status(201).json({
        _id: new_user.id,
        user_name: new_user.user_name,
        email: new_user.email,
    })
}

//the function that generate tokens 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // check for user email 
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            user_name: user.user_name,
            email: user.email,
            status: 201,
            token: generateToken(user.id)
        })
    } else {
        res.status(400);
        res.json({ message: 'Invalid credentials', status: 400 })
    }
}

//get the actuell user
const me = async (req, res) => {

    const { _id, user_name, email, } = await User.findById(req.user.id);
    res.status(200).json({
        id: _id,
        user_name,
        email,
    })
}


const deleteUser=async (req,res)=>{
    const deletedTour= await User.deleteOne({_id:req.body.id})
    res.status(200).json(
        deletedTour
    )
}


module.exports = {
    NewUser,
    loginUser,
    me,
    deleteUser
}





