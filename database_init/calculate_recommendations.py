import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_json("anime_dataset.json")
df["studios"] = [",".join(map(str,s)) for s in df["studios"]]
df["genres"] = [",".join(map(str,g)) for g in df["genres"]]
df["themes"] = [",".join(map(str,t)) for t in df["themes"]]

df["tags"] = df["studios"]+","+df["genres"]+","+df["themes"]
df = df.drop(columns=["synopsis","studios","genres","themes"])

cv = CountVectorizer(max_features=len(df), stop_words="english")
vector = cv.fit_transform(df["tags"].values.astype("U")).toarray()
similarity = cosine_similarity(vector)

export_data = df.drop(columns=["tags"])
export_data["recommendations"] = [[] for i in range(len(export_data))]

for index,row in export_data.iterrows():
  sorted_v = sorted(enumerate(similarity[index]), key = lambda x: -x[1])
  recom_list = list(map(lambda x: df.iloc[x[0]]["mal_id"],sorted_v[0:20]))
  export_data.at[index, "./json/anime_recommendations"] = recom_list
