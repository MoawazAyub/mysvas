const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require("path");


const userRoutes = require("./routes/user");

const app = express();

mongoose.connect('mongodb://test:test123@ds135433.mlab.com:35433/mytodo')
.then(() => {
  console.log('Connected to Database');
})
.catch(() => {
  console.log("Connection failed");
});

app.use(bodyParser.json());

app.use('/images',express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");

  res.setHeader("Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept");

  res.setHeader("Access-Control-Allow-Methods",
   "GET, POST, PATCH, PUT, DELETE, OPTIONS");

  next();
});

app.use("/api/user", userRoutes);

module.exports = app;
