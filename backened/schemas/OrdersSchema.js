const { Schema, Types } = require("mongoose");

const OrdersSchema = new Schema(
  {
    name: String,
    qty: Number,
    price: Number,
    mode: String,
    userId: {
      type: Types.ObjectId, // Reference to the User
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { OrdersSchema };
