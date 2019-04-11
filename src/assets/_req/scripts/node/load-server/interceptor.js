
var express = require('express'),
  app = express(),
  port = process.env.PORT || 4447,
  mongoose = require('mongoose'),
  Task = require('./models/inquiryMoodel'), //models class
  bodyParser = require('body-parser');  
  var cors = require('cors');
  app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/LoadDb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./caller/inqcaller'); 
routes(app); 

app.use(function(req, res) {
    res.status(404).send("not found")
  });

app.listen(port);
console.log(' server started on: ' + port);