const  mongoose  = require('mongoose') ;
const Schema=mongoose.Schema  ;
const commentSchema=new Schema({
    name_user:{
        type:String,
        required:[true,'please add the user name ']
    },
    job_user:{
        type:String,
        required:[true,'please add  the user job ']
    },
    
    comment_content:
    {
        type:String,
        required:[true,'please add the content_comment']
    },
    idplace:
    {
        type: mongoose.Types.ObjectId,
        ref: "Place",
    }
    
},{timestamps:true})

const Comment=mongoose.model('Comment',commentSchema) ;
module.exports=Comment ;
