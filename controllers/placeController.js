const Place = require("../models/place")
const Comment=require("../models/comment")
const Event= require("../models/event")
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
        images: place.images,
        lat: place.lat,
        long: place.long,
        view: place.view,
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




//get all the places with their number of comments for every place 
const getPlaces = async (req, res) => {
    
    
    const getPlacesWithCommentCounts = async () => {
      try {
        const placesWithCommentCounts = await Place.aggregate([
          {
            $lookup: {
              from: 'comments',
              localField: '_id',
              foreignField: 'idplace',
              as: 'comments'
            }
          },
          {
            $project: {
              _id: 1,
              place_title: 1,
              address: 1,
              state: 1,
              category: 1,
              opening_hour: 1,
              closing_hour: 1,
              transport: 1,
              city: 1,
              theme: 1,
              description: 1,
              images: 1,
              lat: 1,
              long: 1,
              view: 1,
              commentCount: { $size: '$comments' }
            }
          }
        ]);
    
        res.status(200).json(
            placesWithCommentCounts
        )
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    
    await getPlacesWithCommentCounts();
    
}



//delete place by id 
const deletePlace = async (req, res) => {
    const deletedTour = await Place.deleteOne({ _id: req.body.id })

    res.status(200).json(
        deletedTour
    )
}



//adding the filters 
const getFilteredPlaces = async (req, res) => {
    const { city, state, place_title } = req.body;
  
    const query = {};
  
    if (city) {
      query.city = city;
    }
  
    if (state) {
      query.state = state;
    }
  
    if (place_title) {
      query.place_title = place_title;
    }
  
    try {
      const places = await Place.find(query);
      res.json(places);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  };


const getEventsOfPlace = async (req, res) => {
  const { placeId } = req.body;

  try {
    const events = await Event.find({ places: { $in: [placeId] } });

    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found for the specified place ID' });
    }

    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};


//get comments of a place
const getCommentsOfPlace = async (req, res) => {
  const { placeId } = req.body;

  try {
    const comments = await Comment.find({ idplace: placeId });

    if (comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for the specified place ID' });
    }

    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};





module.exports = {
    newPlace,
    updatePlace,
    getPlaces,
    deletePlace,
    getFilteredPlaces,
    getEventsOfPlace,
    getCommentsOfPlace
}
