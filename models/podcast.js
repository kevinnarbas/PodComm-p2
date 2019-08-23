var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  text: String,
  rating: {type: Number, min: 0, max: 5},
}, {timestamps: true});

var podcastSchema = new Schema({
  title: {type: String, required: true},
  length: {type: String, match: /\d:[0-5]\d/, default: '1:00'},
  seasons: {type: Number, min: 1, default: 1},
  type: {type: String, enum: ['Random', 'Informational', 'Storytelling'], default: 'Random'},
  genre: {type: String, enum: ['Horror', 'Comedy', 'Business', 'Arts', 'History', 'Sports', 'True Crime', 'News',
    'Society/Culture', 'Education', 'Fiction', 'Government', 'Health/Fitness', 'Kids/Family', 'Music',
    'Religion/Spirituality', 'Science', 'Technology', 'Tv/Film'], required: true},
  hostCount: {type: Number, min: 1, default: 1},
  guest: {type: String, enum: ['Every Episode', 'Never', 'Sometimes'], default: 'Never'},
  reviews: [reviewSchema],
},{timestamps: true});

module.exports = mongoose.model('Podcast', podcastSchema);