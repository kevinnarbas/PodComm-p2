var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useCreateIndex: true});

db.on('connected', function() {
  console.log(`${db.name} is connected at ${db.host}`);
});

module.exports = mongoose;