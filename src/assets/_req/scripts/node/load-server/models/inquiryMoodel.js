'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var InquirySchema = new Schema({
  name: {
    type: String,
  },
  email:{
    type: String
  },
  comment:{
      type: String
   },
  Function: {type: String},
  Arguments : {type: String} 
});

module.exports = mongoose.model('Inquiry', InquirySchema);

