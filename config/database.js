var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useCreateIndex: true});

db.on('connected', function() {
  console.log(`MongoDB at ${process.env.DATABASE_URL}`);
});

module.exports = mongoose;