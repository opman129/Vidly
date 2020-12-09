const mongoose = require('mongoose'); 
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//const genres = require('../db.js/genres-db');

//Schema For Movie
const movieSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    minlength:5, 
    maxlength: 50},
  producer: {type: String, required: true, minlength:5, maxlength: 50},
  tags: [String],
  date: { type: Date, default: Date.now },
  nowShowing: Boolean
});    

//MODEL for SchemaType
const Movie = new mongoose.model("Movie", movieSchema);

//GET ALL GENRES
router.get('/', async (req,res) => {
    const genres = await Movie.find().sort('name');
    res.send(genres);
});

//GET SPECIFIC GENRES
router.get('/:id', async (req,res) => {
  const genre = await Movie.find((c) => c.id === parseInt(req.params.id));
    // const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre){
        return res.status(404).send("The genre with the given ID does not exist")};
    res.send(genre);
});

//CREATE A NEW GENRE && USE EXPRESS VALIDATOR FOR VALIDATION
router.post("/", [body("name").isLength({ min: 5 })], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let genre = new Movie ({
      name: req.body.name,
      producer: req.body.producer,
      tags: req.body.tags,
      nowShowing: req.body.nowShowing
    });
    genre = genre.save();
    res.send(genre);
  });

//UPDATE A SPECIFIC GENRE WITH THE PUT METHOD
router.patch('/:id',  [body("name").isLength({ min: 5 })], (req,res) => {
    //GET COURSE USING COURSE ID
  Movie.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    producer: req.body.producer,
    tags: req.body.tags,
  }, { new: true });


    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre) {
      return res.status(404).send("The genre with the given ID does not exist");
    }
    //VALIDATE COURSE
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //UPDATE COURSE
    genre.name = req.body.name;
    res.send(genre);
});

//DELETE A SPECIFIC GENRE
router.delete('/:id', (req,res) => {
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre){
        return res.status(404).send("The genre with the given ID does not exist")};
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    //Return Genre
    res.send(genre);
});

module.exports = router;