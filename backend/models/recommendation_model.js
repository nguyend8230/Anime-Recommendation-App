const mongoose = require("mongoose");

const recommendation_schema = new mongoose.Schema({
    mal_id: Number,
    recommendations: [Number]
});

module.exports = mongoose.model("recommendation", recommendation_schema);