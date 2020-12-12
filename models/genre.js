const mongoose = require('mongoose');

//Schema For Movie
const genreSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true, 
      minlength:5, 
      maxlength: 50 },
    producer: { type: String, required: true, minlength:5, maxlength: 50 },
    tags: [String],
    date: { type: Date, default: Date.now },
    nowShowing: Boolean
  });    
  
  //MODEL for SchemaType
  const Genre = mongoose.model("Genre", genreSchema);

  module.exports = genreSchema;
  module.exports = Genre;