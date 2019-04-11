'use strict';
module.exports = function(app) {
  var list = require('../controller/controller');

  app.route('/')
    .post(list.Hello);
};