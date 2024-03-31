const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"teacher"
    },
    student: {
        type: [Number],
        required: true,
        ref:"child"
    }
});

module.exports = mongoose.model("class", classSchema);
