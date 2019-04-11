'use strict';


var mongoose = require('mongoose'),
Inquiry = mongoose.model('Inquiry');


exports.Hello = function(req, res) {
  var Hello = new Inquiry(req.body)
  Hello.save(function(err, task) {
    if (err)
    res.send(err);  
    console.dir(req.body);
    res.json("true");
  });
};