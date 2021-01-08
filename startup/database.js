const mongoose = require('mongoose');

module.exports = () => {
//DATABASE CONNECTION 
mongoose.connect('mongodb://localhost/vidly', 
{ useNewUrlParser: true ,
useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB..'))
};