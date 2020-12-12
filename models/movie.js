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
    numberInStock: Number,
    dailyRentalRate: Number
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;