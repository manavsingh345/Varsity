const { Schema } = require("mongoose");

const WalletSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      amount: Number,
      paymentId: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = { WalletSchema };
