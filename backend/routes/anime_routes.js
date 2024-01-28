const express = require("express");
const {
    get_anime_info,
    get_anime_recommendations
} = require("../controllers/anime_controller");

const router = express.Router();

router.get("/anime/:mal_id/recommendations/", get_anime_recommendations);
router.get("/anime/:mal_id/info", get_anime_info);


module.exports = router;