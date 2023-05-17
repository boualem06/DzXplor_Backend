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

//get the last three comments 
const getLastT3Comments = async (req, res) => {
    try {
      const comments = await Comment.find()
        .sort({ createdAt: -1 }) // Sort in descending order based on createdAt field
        .limit(3); // Limit the number of results to 3
  
      res.json(comments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

//get the total number of comments 
const getTotalCommentCount = async (req, res) => {
    try {
      const totalComments = await Comment.countDocuments();
  
      res.json({ count: totalComments });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


module.exports={
    newComment,
    getComments,
    getLastT3Comments,
    getTotalCommentCount
}