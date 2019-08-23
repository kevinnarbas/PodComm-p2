var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
  name: String,
  email: String,
  googleId: String,
  podcasts: [{type: Schema.Types.ObjectId, ref:'Podcast'}],

},{timestamps: true});

module.exports = mongoose.model('User', userSchema);