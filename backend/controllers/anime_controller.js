const Anime = require("../models/anime_model");
const Recommendation = require("../models/recommendation_model");

async function get_anime_info(req,res) {
    const {mal_id} = req.params;
    Anime.find({mal_id: mal_id})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(404).json(error);
        });
}

async function get_anime_recommendations(req,res) {
    const {mal_id} = req.params;
    const result = await Recommendation.find({mal_id: mal_id})
    var recoms = [];
    for(let id of result[0].recommendations) {
        console.log(id);
        const data = await Anime.find({mal_id: id});
        recoms.push(data);
    }

    res.status(200).json(recoms);
}

module.exports = {
    get_anime_info,
    get_anime_recommendations
};