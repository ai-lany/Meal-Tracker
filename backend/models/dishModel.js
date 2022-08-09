const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        date: {
            type: Date,
            default: Date.now
        },
    },
    { collection: 'dishes'}
 )
  
  const Dish = mongoose.model("dish", dishSchema);
  module.exports = Dish;