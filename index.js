require('express-async-errors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

require('./startup/routes')(app);

//Uncaught Exceptions
process.on('uncaughtException', (ex) => {
    process.exit(1);
});

//Unhandled Promise Rejection
process.on('unhandledRejection', (ex) => {
    process.exit(1);
});

//DATABASE CONNECTION 
mongoose.connect('mongodb://localhost/vidly', 
{ useNewUrlParser: true ,
useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB..', err));

//Environment Variable for PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));