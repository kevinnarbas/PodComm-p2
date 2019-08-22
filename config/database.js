var mongoose = require('mongoose');
var db = mongoose.connect;

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

db.on('connected', function() {
    console.log(`Connected to: ${process.env.DATABASE_URL}`);
});

module.exports = mongoose;