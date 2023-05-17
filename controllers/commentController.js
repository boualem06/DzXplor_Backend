const Comment=require("../models/comment")

//adding new comment 
const newComment=async(req,res)=>{
    const {name_user ,job_user ,comment_content ,idplace }=req.body  ;
    const comment=await Comment.create({
        name_user,
        job_user,
        comment_content,
        idplace,
    })
    res.status(201).json({
        _id:comment.id,
        name_user:comment.name_user ,
        job_user:comment.job_user ,
        comment_content:comment.comment_content ,
        idplace:comment.idplace ,
    })
}


//get all the comments 
const getComments = async (req, res) => {
    Comment.find().then((data) => {
        console.log(data);
        res.json(data);
    })
}

module.exports={
    newComment,
    getComments
}