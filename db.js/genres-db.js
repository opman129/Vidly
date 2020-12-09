const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/genres', 
{ useNewUrlParser: true ,
useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB..', err));

const movieSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});     

const Movie = mongoose.model("Movies", movieSchema);


