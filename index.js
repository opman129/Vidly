const { body, validationResult } = require('express-validator');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {id:1, name: "Action"},
    {id:2, name: "Horror"},
    {id:3, name: "Comedy"},
    {id:4, name: "Afrocentric"},
    {id:5, name: "Frightful"}
];

//GET ALL GENRES
app.get('/api/genres', (req,res) => {
    res.send(genres);
});

//GET SPECIFIC GENRES
app.get('/api/genres/:id', (req,res) => {
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre){
        return res.status(404).send("The genre with the given ID does not exist")};
    res.send(genre);
});

//CREATE A NEW GENRE && USE EXPRESS VALIDATOR FOR VALIDATION
app.post("/api/genres", [body("name").isLength({ min: 5 })], (req, res) => {
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
app.put('/api/genres/:id',  [body("name").isLength({ min: 5 })], (req,res) => {
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
app.delete('/api/genres/:id', (req,res) => {
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre){
        return res.status(404).send("The genre with the given ID does not exist")};
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    //Return Genre
    res.send(genre);
});

//Environment Variable for PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));