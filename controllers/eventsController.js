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
  try{
    const deletedTour= await Event.deleteOne({_id:req.body.id})
    res.status(200).json(
        deletedTour
    )
  }
  catch(err){
    res.status(400).json(error.message)
  }

 
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
  // const { status, date, event_title } = req.params;
  // console.log(req.params.status)
let query ;
  if (req.params.status.length>1) {
    query = {... query,"status":req.params.status};
  }

  if (req.params.date.length>1) {
    query = {... query,"date":req.params.date};
  }

  if (req.params.event_title.length>1) {
    query = {... query,"event_title":req.params.event_title};
  }
  console.log(query)
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



const getEventCountByMonth = async (req, res) => {
  // const { year } = req.body;



    // const result = await Event.aggregate([
    //   {
    //     $match: {
    //       date: { $regex: `^${year}` }
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: { $substr: ['$date', 0, 7] },
    //       count: { $sum: 1 }
    //     }
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       month: '$_id',
    //       count: 1
    //     }
    //   },
    //   {
    //     $sort: { month: 1 }
    //   }
    // ]);

    const year = 2023; // Replace with the desired year

    try {
      const result = await Event.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(year, 0, 1), // Start of the year
              $lt: new Date(year + 1, 0, 1) // Start of the next year
            }
          }
        },
        {
          $group: {
            _id: {
              month: { $month: { $toDate: "$date" } }
            },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            nb_events: "$count"
          }
        },
        {
          $sort: {
            month: 1
          }
        }
      ]);
    res.status(200).json(result)
    } catch (error) {
      console.error(error);
    }
  }
    
    

  


async function getEventsAfterIndex(req,res) {
  try {
    const event = await Event.find().skip(req.params.index*9).limit(9);
    res.json( event );
  } catch (error) {
    console.error(error);
    // Handle the error
    throw error;
  }
}



    

module.exports = {
    newEvent,
    updateEvent,
    deleteEvent,
    getThreeRandomEvents,
    eventsFilter,
    getTotalEvent,
    getEventCountByMonth,
    getEventsAfterIndex
}