const mongoose = require('mongoose');
const genreSchema = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
      type: String, 
      required: true, 
      minlength:4, 
      maxlength: 255
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255 
    },
    dailyRentalRate:  {
        type: Number,
        required: true,
        min: 0,
        max: 255 
    },
}));

module.exports = Movie;