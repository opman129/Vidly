const Genre = require('../models/genre');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//GET ALL GENRES
router.get('/', async (req,res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

//CREATE A NEW GENRE && USE EXPRESS VALIDATOR FOR VALIDATION
router.post("/", [body("name").isLength({ min: 5 })], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };
    let genre = new Genre ({
      name: req.body.name,
      producer: req.body.producer,
      tags: req.body.tags,
      nowShowing: req.body.nowShowing
    });
    genre = await genre.save();
    res.send(genre);
  });

  //GET SPECIFIC GENRES
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id, { useFindAndModify: false });
  if (!genre) {
    return res.status(404).send("The genre with the given ID does not exist");
  }
  res.send(genre);
});

//UPDATE A SPECIFIC GENRE WITH THE PATCH METHOD
router.patch('/:id',  [body("name").isLength({ min: 5 })], async (req,res) => {
  //VALIDATE Movie
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //GET Movie USING Movie ID and Update
  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    producer: req.body.producer,
    tags: req.body.tags,
    nowShowing: req.body.nowShowing
    }, { new: true }, { useFindAndModify: false } );
    //return status code if genre doesnt exist
    if (!genre) {
      return res.status(404).send("The genre with the given ID does not exist");
    };
    res.send(genre);
});

//DELETE A SPECIFIC GENRE
router.delete('/:id', async (req,res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id, { useFindAndModify: false });
    if (!genre){
        return res.status(404).send("The genre with the given ID does not exist")};
    //Return Genre
    res.send(genre);
});

module.exports = router;