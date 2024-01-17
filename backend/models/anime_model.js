const mongoose = require("mongoose");

const anime_schema = new mongoose.Schema({
    mal_id: Number,
    url: String,
    image_url: String,
    title: String,
    title_english: String,
    recommendations: [Number]
});

module.exports = mongoose.model("Anime", anime_schema);