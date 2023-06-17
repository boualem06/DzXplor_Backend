const  mongoose  = require('mongoose') ;
const Schema=mongoose.Schema  ;
const eventSchema=new Schema({
    event_title:
    {
        type:String,
        required:[true,'please add the event_title ']
    },
    status :{
        type:String,
        required:[true,'please add  the status  ']
    },
    
    places :
    [
        {
          type: mongoose.Types.ObjectId,
          ref: "Place",
        },
    ],
    description :
    {
        type:String,
        required:[true,'please specify the description ']
    },
    image :
    {
        type:String,
        required:[true,'please specify the image ']
    },
    date:
    {
        type:String,
        required:[true,'please specify the date ']
    },
    time:
    {
        type:String,
        required:[true,'please specify the time ']
    },
    
},{timestamps:true})

const Event=mongoose.model('Event',eventSchema) ;
module.exports=Event ;
