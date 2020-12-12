const Movie = require('../models/movie');
const Genre = require('../models/genre');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//GET ALL MOVIES
router.get('/', async (req,res) => {
    try {
        const movies = await Movie.find().sort("name");
        res.send(movies);
    } catch (err) {
        console.log("Error", err.message);
    };
});

//CREATE A NEW MOVIE && USE EXPRESS VALIDATOR FOR VALIDATION
//Valdate
router.post("/", [body("title").isLength({ min: 4 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
      //const genre = await Genre.findById(req.body.genreId);
      //if (!genre) return res.status(400).send("Invalid genre.");

      let movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      });
      movie = await movie.save();
      res.send(movie);
    }
    catch(err){
        console.log(err)
    }
});

//GET SPECIFIC MOVIES
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id, { useFindAndModify: false });
  if (!movie) {
    return res.status(404).send("The movie with the given ID does not exist");
  };
  res.send(movie);
});

//UPDATE A SPECIFIC MOVIE WITH THE PATCH METHOD
router.patch('/:id',  [body("title").isLength({ min: 5 })], async (req,res) => {
  //VALIDATE Movie
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //GET Movie USING Movie ID and Update
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: req.body.genre,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }, { useFindAndModify: false }
  );
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
    res.status(204).send("Successfully Deleted");
});

module.exports = router;