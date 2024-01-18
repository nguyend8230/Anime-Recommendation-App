const express = require("express");
const {
    get_anime_info,
    get_anime_recommendations
} = require("../controllers/anime_controller");

const router = express.Router();

router.get("/recommendations/anime/:mal_id", get_anime_recommendations);
router.get("/anime/:mal_id/", get_anime_info);


module.exports = router;