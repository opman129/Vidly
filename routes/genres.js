const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const genres = [
    {id:1, name: "Action"},
    {id:2, name: "Horror"},
    {id:3, name: "Comedy"},
    {id:4, name: "Afrocentric"},
    {id:5, name: "Frightful"}
];

//GET ALL GENRES
router.get('/', (req,res) => {
    res.send(genres);
});

//GET SPECIFIC GENRES
router.get('/:id', (req,res) => {
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
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
    const genre = {
      id: genres.length + 1,
      name: req.body.name,
    };
    genres.push(genre);
    res.send(genre);
  });

//UPDATE A SPECIFIC GENRE WITH THE PUT METHOD
router.patch('/:id',  [body("name").isLength({ min: 5 })], (req,res) => {
    //GET COURSE USING COURSE ID
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