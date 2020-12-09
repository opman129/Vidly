const mongoose = require('mongoose'); 
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  phone: String,
  isGold: Boolean,
  date: { type: Date, default: Date.now },
});
//Model For Customers
const Customer = mongoose.model("Customer", customerSchema);

//Get all Customers
router.get("/", async (req,res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

//Create new Customer
router.post("/", [body("name").isLength({ min: 5 }), body("phone").isLength({ max: 11 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let customer = new Customer ({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  customer = await customer.save();
  res.send(genre);
});













module.exports = router;