const mongoose = require("mongoose");

const anime_schema = new mongoose.Schema({
    mal_id: Number
});

module.exports = mongoose.model("test", anime_schema);