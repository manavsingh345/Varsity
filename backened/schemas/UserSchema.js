const { Schema } = require("mongoose");
const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    marginAvailable: {
        type: Number,
        default: 10000, // or 0 if you're starting with nothing
    },
    openingBalance: {
        type: Number,
        default: 10000,
    },
});

module.exports = { UserSchema };
