import {useState,useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";

import {fetch_data} from "./Fetch";

function Recommendations() {
    const history = useHistory();
    const {mal_id} = useParams();
    
    // map between anime to the recommendations of that anime using mal_id
    const [recommendations, set_recommendations] = useState({});

    // store the information of each anime
    const [anime_info, set_anime_info] = useState({});

    useEffect(() => {
        console.log(`visited ${mal_id}`);
        console.log(recommendations);
        async function fetch_recommendations() {
            console.log(`fetched ${mal_id}`);
            try {
                const data = await fetch_data(`http://localhost:4000/api/recommendations/anime/${mal_id}`);
                for(let anime of data) {
                    anime_info[anime["mal_id"]] = anime;
                }
                set_recommendations(recommendations => ({ ...recommendations, [mal_id]: anime_info[mal_id]["recommendations"] }));
            }
            catch(error) {
                history.push("/error");
            }
        }

        if(!(mal_id in recommendations)) {
            fetch_recommendations();
        }

    },[mal_id]);

    function display_recommendations() {
        return(
            <div className="container">
                <h2>Recommendations for: {anime_info[mal_id]["title"]}</h2>
                <div className="recoms_container">
                    {
                        recommendations[mal_id].map((id) => 
                            <div className="recommendation" key = {id}> 
                                <a href={anime_info[id]["url"]} target="_blank">
                                    <img src={anime_info[id]["image_url"]}></img>
                                </a>
                                <a href={anime_info[id]["url"]} target="_blank">
                                    {anime_info[id]["title"]}
                                </a>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }

    return (
        <div className="Recommendations"> 
            {recommendations[mal_id] && display_recommendations()}
        </div>
    );

}

export default Recommendations;
