const Place = require("../models/place")
const Event= require("../models/event")
const Comment = require("../models/comment")

//adding new place 
const newPlace = async (req, res) => {

    const { place_title, address, state, category, opening_hour, closing_hour, transport, city, theme, description, images, lat, long, view } = req.body;

    const place = await Place.create({
        place_title,
        address,
        state,
        category,
        opening_hour,
        closing_hour,
        transport,
        city,
        theme,
        description,
        images,
        lat,
        long,
        view
    })

    res.status(201).json({
        _id: place.id,
        place_title: place.place_title,
        address: place.address,
        state: place.state,
        category: place.category,
        opening_hour: place.opening_hour,
        closing_hour: place.closing_hour,
        transport: place.transport,
        city: place.city,
        theme: place.theme,
        description: place.description,
        images : place.images ,
        lat : place.lat ,
        long: place.long,
        view : place.view ,
    })
}




//this is the code to update a place 
const updatePlace = async (req, res) => {
    try {
      const result = await Place.updateOne(
        { _id: req.body.id },
        {
          $set: {
            place_title: req.body.place_title,
            address: req.body.address,
            state: req.body.state,
            category: req.body.category,
            opening_hour: req.body.opening_hour,
            closing_hour: req.body.closing_hour,
            transport: req.body.transport,
            city: req.body.city,
            theme: req.body.theme,
            description: req.body.description,
            images: req.body.images,
            lat: req.body.lat,
            long: req.body.long,
            view: req.body.view
          }
        }
      );
  
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



//get all the places 
const getPlaces = async (req, res) => {
    Place.find().then((data) => {
        console.log(data);
        res.json(data);
    })
}

//delete place by id 
const deletePlace=async (req,res)=>{
    const deletedTour= await Place.deleteOne({_id:req.body.id})
    res.status(200).json(
        deletedTour
    )
}



//get place's details and its comments and events
const getPlace = async (req, res) => {
  const { placeId } = req.params;

  try {
    // Get the place details
    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    // Increment the number of views
    place.view += 1;
    await place.save();

    // Get the comments for the place
    const comments = await Comment.find({ idplace: placeId });

    // Get the events for the place
    const events = await Event.find({ places: { $in: [placeId] } });

    res.json({ place, comments, events });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};



//get three most viewed places
const getMostViewedPlaces = async (req, res) => {
  try {
    const places = await Place.find().sort({ view: -1 }).limit(3);
    res.json(places);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

//return number of comments of a specific place 
const numberOfCommentstByPlace = async (req, res) => {
  const { placeId } = req.params;

  try {
    const commentCount = await Comment.countDocuments({ idplace: placeId });
    res.json({ commentCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};




module.exports={
    newPlace,
    updatePlace,
    getPlaces,
    deletePlace,
    getPlace,
    getMostViewedPlaces,
    numberOfCommentstByPlace,
}