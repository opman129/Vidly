const Movie = require('../models/movie');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//GET ALL MOVIES
router.get('/', async (req,res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

//CREATE A NEW MOVIE && USE EXPRESS VALIDATOR FOR VALIDATION
//Valdate
router.post("/", [body("title").isLength({ min: 4 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let movie = new Movie ({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  res.send(movie);
});

//GET SPECIFIC MOVIES
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id, { useFindAndModify: false });
  if (!movie) {
    return res.status(404).send("The movie with the given ID does not exist");
  }
  res.send(movie);
});

//UPDATE A SPECIFIC MOVIE WITH THE PATCH METHOD
router.patch('/:id',  [body("name").isLength({ min: 5 })], async (req,res) => {
  //VALIDATE Movie
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //GET Movie USING Movie ID and Update
  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate }, 
    { new: true });
    //Return Status Code If Movie Doesnt Exist
    if (!movie) {
      return res.status(404).send("The movie with the given ID does not exist");
    };
    res.send(movie);
});

//DELETE A SPECIFIC MOVIE
router.delete('/:id', async (req,res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id, { useFindAndModify: false });
    if (!movie){
        return res.status(404).send("The movie with the given ID does not exist")};
    //Return Movie
    res.send(movie);
});

module.exports = router;