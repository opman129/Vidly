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