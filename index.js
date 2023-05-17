const express = require('express')
const { default: mongoose } = require('mongoose')

const userRoutes = require("./routes/userRoutes") ;
const commentRoutes = require("./routes/commentRoutes") ;
const placeRoutes = require("./routes/placeRoutes") ;

const app = express()
const cors = require("cors");
require("dotenv").config();

const port = 5000
const dbURI="mongodb+srv://kbhamroune:dzxplore@cluster0.mplbr7c.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => { console.log("connected to db"); app.listen(port); })
  .catch((err) => { console.log(err) });

app.use(cors()) ;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

app.use(userRoutes);
app.use(commentRoutes)
app.use(placeRoutes)