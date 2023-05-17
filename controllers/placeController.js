const Place = require("../models/place")

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


//update place 
// const updatePlace = async(req, res) => {
    
//     Place.updateOne({_id:req.body.id},{$set: { place_title:req.body.place_title, address:req.body.address, state:req.body.state, category:req.body.category, opening_hour:req.body.opening_hour, closing_hour:req.body.closing_hour, transport:req.body.transport, city:req.body.city, theme:req.body.theme, description:req.body.description, images:req.body.images, lat:req.body.lat, long:req.body.long, view:req.body.view }},(err,result)=>{
//         if(err) return console.log(err)
//         res.json(result) ;
//     })
// }


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


module.exports={
    newPlace,
    updatePlace,
    getPlaces
}