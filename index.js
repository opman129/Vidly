require('express-async-errors');
const express = require('express');
const app = express();

//Import routes/middleware and database
require('./startup/routes')(app);
require('./startup/database')();

//Uncaught Exceptions
process.on('uncaughtException', (ex) => {
    process.exit(1);
});

//Unhandled Promise Rejection
process.on('unhandledRejection', (ex) => {
    process.exit(1);
});

//Environment Variable for PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));