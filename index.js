const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const express = require('express');
const app = express();
const genres = require('./routes/genres');

//DATABASE CONNECTION 
mongoose.connect('mongodb://localhost/vidly', 
{ useNewUrlParser: true ,
useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB..', err));

//Load Built-In Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Load Modules
app.use('/api/genres', genres);

//Environment Variable for PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));