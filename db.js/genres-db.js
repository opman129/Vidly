const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/genres', 
{ useNewUrlParser: true ,
useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB..', err));

const movieSchema = new mongoose.Schema({
  name: String,
  producer: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  nowShowing: Boolean
});     

const Movie = mongoose.model("Movies", movieSchema);

//CREATE NEW MOVIE GENRE

async function createMovie(){
    try {
        const Movie = mongoose.model('Movie', movieSchema);

        
    } catch (err) {
        console.log('Error', err.message)
    }
}

