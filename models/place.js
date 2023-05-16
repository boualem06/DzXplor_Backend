const  mongoose  = require('mongoose') ;
const Schema=mongoose.Schema  ;
const placetSchema=new Schema({
    place_title :{
        type:String,
        required:[true,'please add the place_title  ']
    },
    address:{
        type:String,
        required:[true,'please add  the address ']
    },
    
    state:
    {
        type:String,
        required:[true,'please add the state']
    },
    category:
    {
        type:String,
        required:[true,'please add the category ']
    },
    opening_hour:
    {
        type:String,
        required:[true,'please add the opening_hour ']
    },
    closing_hour:
    {
        type:String,
        required:[true,'please add the closing_hour ']
    },
    transport :
    [
        {
          type: String,
        },
    ],
    city:
    {
        type:String,
        required:[true,'please add the city ']
    },
    theme:
    {
        type:String,
        required:[true,'please add the theme ']
    },
    description:
    {
        type:String,
        required:[true,'please add the description ']
    },
    images :
    [
        {
          type: String,
        },
    ],
    lat :
    {
        type:Number,
        required:[true,'please add the lat  ']
    },
    long:
    {
        type:Number,
        required:[true,'please add the long ']
    },
    view :
    {
        type:Number,
        required:[true,'please add the view  ']
    },

    
},{timestamps:true})

const Place=mongoose.model('Place',placetSchema) ;
module.exports=Place ;
