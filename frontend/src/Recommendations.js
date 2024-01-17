import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Recommendations() {
    const {mal_id} = useParams();
    const [anime_info, set_anime_info] = useState(null);
    const [recoms, set_recoms] = useState({});

    async function fetch_data(url) {
        return new Promise((resolve,reject) => {
            fetch(url)
                .then((response) => {
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    return response.json();
                })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    
    useEffect(() => {
        console.log(`visited ${mal_id}`)
        async function temp() {
            console.log(`fetched ${mal_id}`);
            try {
                const data = await fetch_data(`http://localhost:4000/api/recommendations/${mal_id}`);
                for(let anime of data) {
                    recoms[anime["mal_id"]] = anime
                }
                set_anime_info(recoms[mal_id]);
            }
            catch(error) {
                console.log(error);
                // go to 404 page
            }
        }
        temp();
    },[mal_id]);

    function display_recommendations(anime_info) {
        return(
            <div className="container">
                <div className="test">
                    <h1>recommendations for: {anime_info["title"]}</h1>
                </div>
                <div className="recoms_container">
                    {anime_info["recommendations"].map((id) => 
                        <div className="recommendation" key={id}>  
                            <a href={recoms[id]["url"]} target="_blank">
                                <img src={recoms[id]["image_url"]}></img>
                                {recoms[id]["title"]}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        );
    }



    return (
        <div className="Recommendations"> 
            {anime_info && display_recommendations(anime_info)}
        </div>
    );

}

export default Recommendations;