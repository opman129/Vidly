const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
      type: String, 
      required: true, 
      minlength:4, 
      maxlength: 50
    },
    numberInStock: Number,
    dailyRentalRate: Number
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;