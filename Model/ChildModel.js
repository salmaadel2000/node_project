const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
        _id: Number,
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: String
});

module.exports = mongoose.model("child", childSchema);
