const Customer = require('../models/customer');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

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
  res.send(customer);
});

//Get specific customer
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id, { useFindAndModify: false });
  if (!customer) {
    return res.status(404).send("The customer with the given ID does not exist");
  }
  res.send(customer);
});

//Update Customer
router.patch('/:id',  [body("name").isLength({ min: 5 }), body("phone").isLength({ max: 11 })], async (req,res) => {
  //Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Get Customer by Id
  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold},
    { new: true });
    //Check If customer exists or not
    if (!customer) {
      return res.status(404).send("The customer with the given ID does not exist");
    };
    res.send(customer);
});

//Delete Customer
router.delete('/:id', async (req,res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id, { useFindAndModify: false });
  if (!customer){
      return res.status(404).send("The customer with the given ID does not exist")};
  //Return Customer
  res.send(customer);
});

module.exports = router;