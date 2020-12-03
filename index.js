const { body, validationResult } = require('express-validator');
const express = require('express');
const app = express();

app.use(express.json());

//Environment Variable for PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));