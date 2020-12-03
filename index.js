const { body, validationResult } = require('express-validator');
const express = require('express');
const app = express();
const genres = require('./routes/genres');

//Load Built-In Middleware
app.use(express.json());
app.use(express.urlencoded());

//Load Modules
app.use('/api/genres', genres);

//Environment Variable for PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));