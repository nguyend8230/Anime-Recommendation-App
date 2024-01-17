const Anime = require("../models/anime_model");

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
    console.log(req.params);
    const {mal_id} = req.params;
    Anime.find({mal_id: mal_id})
        .then(async (result) => {
            var recoms = [];
            for(let id of result[0]["recommendations"]) {
                const data = await Anime.find({mal_id: id});
                recoms.push(data[0]);
            }
            // console.log(recoms);
            res.status(200).json(recoms);
        })
        .catch((error) => {
            res.status(404).json(error);
        });
}

module.exports = {
    get_anime_info,
    get_anime_recommendations
};