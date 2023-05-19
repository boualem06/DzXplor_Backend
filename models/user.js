const  mongoose  = require('mongoose') ;
const Schema=mongoose.Schema  ;
const userSchema=new Schema({
    user_name:{
        type:String,
        required:[true,'please add a user_name']
    },
    email:{
        type:String,
        required:[true,'please add an email']
    },
    password:{
        type:String,
        required:[true,'please add a password']
    },
   
    
},{timestamps:true})

const User=mongoose.model('User',userSchema) ;
module.exports=User ;
