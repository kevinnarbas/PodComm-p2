var mongoose = require('mongoose');
var Schema = mongoose.Schema();

var reviewSchema = new Schema({
    text: String,
    rating: {type: Number, min: 0, max: 5},
}, {timestamps: true});

var podcastSchema = new Schema({
    length: String,
    seasons: {type: Number, min: 1},
    type: {type: String, enum: ['Random', 'Informational', 'Storytelling']},
    genre: {type: String, enum: ['Horror', 'Comedey', 'Business', 'Arts', 'History', 'Sports', 'True Crime']},
    hostCount: {type: Number, min: 1},
    guest: {type: String, enum: ['Yes', 'No', 'Sometimes']},
});

module.exports = mongoose.model('Podcast', podcastSchema);