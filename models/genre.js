const mongoose = require('mongoose');

//Schema For Movie
const movieSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true, 
      minlength:5, 
      maxlength: 50 },
    producer: {type: String, required: true, minlength:5, maxlength: 50},
    tags: [String],
    date: { type: Date, default: Date.now },
    nowShowing: Boolean
  });    
  
  //MODEL for SchemaType
  const Movie = mongoose.model("Movie", movieSchema);

  module.exports = Movie;