const Event= require("../models/event")

//add a new event
const newEvent = async (req, res) => {
    const {  event_title, status,places, description,image,date,time } = req.body;
    const event =await Event.create({
        event_title,
         status,places, 
         description,
         image,
         date,
         time,
       
    })
    res.status(201).json({
        _id: event.id,
        event_title: event.event_title,
        status: event.status,
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


//events filtered by state
const filtreEventsByStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const filteredEvents = await Event.find({ status });

    res.json(filteredEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//search events by title
const searchEventsByTitle = async (req, res) => {
  const { event_title } = req.body;

  try {
    const filteredEvents = await Event.find({ event_title });

    res.json(filteredEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//filter events by date 
const filterEventsByDate = async (req, res) => {
  const { date } = req.body;

  try {
    const filteredEvents = await Event.find({ date });

    res.json(filteredEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
    newEvent,
    updateEvent,
    deleteEvent,
    getThreeRandomEvents,
    filtreEventsByStatus,
    searchEventsByTitle,
    filterEventsByDate,
}
