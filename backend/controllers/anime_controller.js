require("dotenv").config();
const redis = require("redis");
const Anime = require("../models/anime_model");
const Recommendation = require("../models/recommendation_model");

const client = redis.createClient(process.env.REDIS_PORT);

if(!client.isOpen) {
    client.connect();
}

async function get_anime_info(req,res) {
    const {mal_id} = req.params;

    const value = await client.get("info: " + mal_id);
    
    if(value) {
        res.status(200).send(value);
        return;
    }

    const result = await Anime.find({mal_id: mal_id});
    client.setEx("info: " + mal_id, 3600, JSON.stringify(...result));
    res.status(200).json(...result);
    
}

async function get_anime_recommendations(req,res) {
    const {mal_id} = req.params;

    const value = await client.get("recommendations: " + mal_id);
    if(value) {
        res.status(200).send(value);
        return;
    }

    const result = await Recommendation.find({mal_id: mal_id});
    var recoms = [];
    for(let id of result[0].recommendations) {
        const data = await Anime.find({mal_id: id});
        recoms.push(...data);
    }

    client.setEx("recommendations: " + mal_id, 3600, JSON.stringify(recoms));
    
    res.status(200).json(recoms);
}

module.exports = {
    get_anime_info,
    get_anime_recommendations
};