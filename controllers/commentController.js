const Comment = require("../models/comment")

//adding new comment 
const newComment = async (req, res) => {
    const { name_user, job_user, comment_content, idplace } = req.body;
    const comment = await Comment.create({
        name_user,
        job_user,
        comment_content,
        idplace,
    })
    res.status(201).json({
        _id: comment.id,
        name_user: comment.name_user,
        job_user: comment.job_user,
        comment_content: comment.comment_content,
        idplace: comment.idplace,
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


//get the number of comments for every mounth 
const getCommentsByMonth = async (req, res) => {
    const year = parseInt(req.body.year); // Assuming the year is passed as a number

Comment.aggregate([
  {
    $match: {
      createdAt: { $gte: new Date(year, 0, 1), $lt: new Date(year + 1, 0, 1) }
    }
  },
  {
    $group: {
      _id: { $month: "$createdAt" },
      count: { $sum: 1 }
    }
  },
  {
    $group: {
      _id: null,
      counts: { $push: { month: "$_id", count: "$count" } }
    }
  },
  {
    $project: {
      _id: 0,
      counts: {
        $map: {
          input: { $range: [1, 13] }, // Updated to include 13 for December
          as: "month",
          in: {
            month: "$$month",
            count: {
              $ifNull: [
                { $arrayElemAt: [{ $filter: { input: "$counts", cond: { $eq: ["$$this.month", "$$month"] } } }, 0] },
                { month: "$$month", count: 0 }
              ]
            }
          }
        }
      }
    }
  },
  {
    $unwind: "$counts"
  },
  {
    $replaceRoot: { newRoot: "$counts" }
  },
  {
    $sort: { month: 1 }
  },
  {
    $project: {
      month: "$month",
      count: "$count"
    }
  }
])
.then(result => {
  // Send the result as a response
  res.json(result);
})
.catch(err => {
  // Handle the error
  console.log(err);
  return res.status(500).json({ error: "An error occurred" });
});
};



module.exports = {
    newComment,
    getComments,
    getLastT3Comments,
    getTotalCommentCount,
    getCommentsByMonth
}