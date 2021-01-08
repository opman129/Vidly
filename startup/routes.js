const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

module.exports = (app) => {
  //Load Built-In Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //Load Modules/Middleware/Routes
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
};
