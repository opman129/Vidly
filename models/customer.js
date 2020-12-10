const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    phone: { 
      type: String, 
      required: true },
    isGold: { 
      type: Boolean, 
      default: false },
    date: { 
      type: Date, 
      default: Date.now },
  });
  //Model For Customers
  const Customer = mongoose.model("Customer", customerSchema);

  module.exports = Customer;