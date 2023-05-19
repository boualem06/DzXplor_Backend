const Event= require("../models/event")

//add a new event
const newEvent = async (req, res) => {
    const {  event_title, status,places, description,image,date,time } = req.body;
    const event =await Event.create({
         event_title,
         status,
         places, 
         description,
         image,
         date,
         time,
       
    })
    res.status(201).json({
        _id: event.id,
        event_title: event.event_title,
        status: event.status,
        places:event.places,
        description:event.description,
        image:event.image,
        date:event.date,
        time:event.time,
       
    })
}


//update an existing event 
const updateEvent = async (req, res) => {
  try {
    const result = await Event.updateOne(
      { _id: req.body.id },
      {
        $set: {
          event_title: req.body.event_title,
          status: req.body.status,
          places: req.body.places,
          description: req.body.description,
          image: req.body.image,
          date: req.body.date,
          time: req.body.time
        }
      }
    );

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//delete an event by its id
const deleteEvent=async (req,res)=>{
  const deletedTour= await Event.deleteOne({_id:req.body.id})
  res.status(200).json(
      deletedTour
  )
}

//get three random events
const getThreeRandomEvents = async (req, res) => {
  try {
    const randomEvents = await Event.aggregate([
      { $sample: { size: 3 } }
    ]);

    res.json(randomEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// Filter events by title, date, and status
const eventsFilter = async (req, res) => {
  const { status, date, event_title } = req.query;

  const query = {};

  if (status) {
    query.status = status;
  }

  if (date) {
    query.date = date;
  }

  if (event_title) {
    query.event_title = event_title;
  }

  try {
    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};



//get the total number of events stored in db
const getTotalEvent = async (req, res) => {
  try {
    const count = await Event.countDocuments();
    res.json({ count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};



//get the number of events by month (it will be used in the statistics page )
const getEventCountByMonth = async (req, res) => {
  const { year } = req.query;

  try {
    const result = await Event.aggregate([
      {
        $match: {
          date: { $regex: `^${year}` }
        }
      },
      {
        $group: {
          _id: { $substr: ['$date', 0, 7] },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          count: 1
        }
      },
      {
        $sort: { month: 1 }
      }
    ]);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};






    

module.exports = {
    newEvent,
    updateEvent,
    deleteEvent,
    getThreeRandomEvents,
    eventsFilter,
    getTotalEvent,
    getEventCountByMonth,
}