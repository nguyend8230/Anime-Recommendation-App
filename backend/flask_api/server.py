import os
from dotenv import load_dotenv
import requests
from flask import Flask
from flask_restful import Api, Resource, abort
from flask_cors import CORS
from pymongo import MongoClient
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

load_dotenv()
URI = os.getenv("URI")

app = Flask(__name__)
CORS(app)
api = Api(app)

upcoming_animes = []

class upcoming_recommendations_calculator(Resource):
    def __init__(self):
        client = MongoClient(URI)
        db = client.get_database("anime_recommendations")
        self.animes_info = db.animes

    def fetch_anime_info(self, mal_id):
        return self.animes_info.find_one({"mal_id": mal_id})

    # return the upcoming animes in the order of recommendation
    def calculate_upcoming_recommendations(self):
       
        df = pd.DataFrame(upcoming_animes)
        df["studios"] = [",".join(map(lambda x: x["name"], s)) for s in df["studios"]]
        df["genres"] = [",".join(map(lambda x: x["name"], g)) for g in df["genres"]]
        df["themes"] = [",".join(map(lambda x: x["name"], t)) for t in df["themes"]]
        df["tags"] = df["studios"]+","+df["genres"]+","+df["themes"]

        cv = CountVectorizer(stop_words="english")
        vector = cv.fit_transform(df["tags"].values).toarray()
        similarity = cosine_similarity(vector)

        upcoming_animes_ordered_by_similarity = sorted(list(enumerate(similarity[-1])),reverse = True, key = lambda x: x[1])

        return upcoming_animes_ordered_by_similarity

    def get(self, mal_id):
        # fetch the info of the anime that we are querying for
        queried_anime_info = self.fetch_anime_info(mal_id)

        if not queried_anime_info:
            abort(404, message="Anime not found...")

        queried_anime_info.pop("_id")

        # temporarily put the anime that we are querying for into the list of upcoming animes
        # we will pop it out of the list later
        upcoming_animes.append(queried_anime_info)
        upcoming_animes_ordered_by_similarity = self.calculate_upcoming_recommendations()
        recommendations = list(map(lambda x: upcoming_animes[x[0]], upcoming_animes_ordered_by_similarity))

        upcoming_animes.pop()

        return {"data": recommendations}
    
api.add_resource(upcoming_recommendations_calculator, "/api/anime/<int:mal_id>/recommendations/upcoming")

if __name__ == "__main__":
    response = requests.get("https://api.jikan.moe/v4/seasons/upcoming")
    upcoming_animes = response.json()["data"]

    app.run(debug=True)

    
