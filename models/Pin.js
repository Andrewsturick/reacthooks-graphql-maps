const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema({
        createdAt: String,
        title: String,
        content: String,
        image: String,
        latitude: Number,
        longitude: Number,
        author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
        comments: [{
            text: String,
            createdAt: { type: Date, default: Date.now },
            author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
        }]
}, {timestamps: true});


const Pin = mongoose.model("Pin", pinSchema);

module.exports = Pin;