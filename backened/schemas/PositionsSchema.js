const { Schema } = require("mongoose");
const mongoose=require("mongoose");

const PositionsSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  product: String,
  qty: Number,
  avg: Number,
  price: Number
});

module.exports = { PositionsSchema };