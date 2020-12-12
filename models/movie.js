const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
      type: String, 
      required: true, 
      minlength:4, 
      maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true},
    dailyRentalRate:  {
        type: Number,
        required: true}
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;