const Rental = require('../models/rental');
const Movie = require('../models/movie'); 
const Customer = require('../models/customer'); 
const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const { body, validationResult } = require('express-validator');

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find().sort("-dateOut");
    res.send(rentals);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  try {
    new Fawn.Task()
    .save('rentals', rental)
    .update('movies', { _id: movie._id}, {
        $inc: { numberInStock: -1 }
    })
    .run();

  res.send(rental);
  } catch(error){
      console.log(error);
  };
  
});

router.get('/:id', async (req, res) => {
    try {
      const rental = await Rental.findById(req.params.id);
      if (!rental)
        return res.status(404).send("The rental with the given ID was not found.");
      res.send(rental);
    } catch (error) {
      console.log(error);
    }
  
});

module.exports = router; 