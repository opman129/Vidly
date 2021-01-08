const mongoose = require('mongoose');

//DATABASE CONNECTION 
mongoose.connect('mongodb://localhost/vidly', 
{ useNewUrlParser: true ,
useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB..', err));