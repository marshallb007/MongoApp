var mongoose = require('mongoose');

 
var connectString =
{ local : 'mongodb://localhost/testdb',
  mlab : "mongodb://mongodb://marshallb:duke500@ds021010.mlab.com:21010/marshallmongo"};



mongoose.connect(connectString.mlab);

var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

module.exports = db;
