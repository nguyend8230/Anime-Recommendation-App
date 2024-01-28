const Anime = require("../models/anime_model");
const Recommendation = require("../models/recommendation_model");

var anime_info = {};

var recommendations = {};

async function get_anime_info(req,res) {
    const {mal_id} = req.params;
    Anime.find({mal_id: mal_id})
        .then((result) => {
            anime_info[mal_id] = result;
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
        const data = await Anime.find({mal_id: id});
        recoms.push(...data);
    }

    recommendations[mal_id] = result[0].recommendations;

    res.status(200).json(recoms);
}

module.exports = {
    get_anime_info,
    get_anime_recommendations
};