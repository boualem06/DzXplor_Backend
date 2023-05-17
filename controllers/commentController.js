const Comment=require("../models/comment")
const newComment=async(req,res)=>{
  
    const {name_user ,job_user ,comment_content ,idplace }=req.body  ;
  

    

    const comment=await Comment.create({
        name_user,
        job_user,
        comment_content,
        idplace,
    })
    console.log(comment)
    res.status(201).json({
        _id:comment.id,
        name_user:comment.name_user ,
        job_user:comment.job_user ,
        comment_content:comment.comment_content ,
        idplace:comment.idplace ,
    })
}



module.exports={
    newComment
}