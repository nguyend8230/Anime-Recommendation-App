import {useState,useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";

import {fetch_data} from "./Fetch";

function Recommendations() {
    const history = useHistory();
    const {mal_id} = useParams();
    
    // map between anime to the recommendations of that anime using mal_id
    const [recoms, set_recoms] = useState({});

    //store the info of the anime that is being recommended
    const [anime_info, set_anime_info] = useState(null);

    useEffect(() => {
        console.log(`visited ${mal_id}`);
        async function temp() {
            console.log(`fetched ${mal_id}`);
            try {
                const data = await fetch_data(`http://localhost:4000/api/recommendations/anime/${mal_id}`);
                for(let anime of data) {
                    recoms[anime["mal_id"]] = anime
                }
                set_anime_info(recoms[mal_id]);
            }
            catch(error) {
                history.push("/error");
            }
        }
        temp();
    },[mal_id]);

    function display_recommendations(anime_info) {
        return(
            <div className="container">
                <h2>Recommendations for: {anime_info["title"]}</h2>
                <div className="recoms_container">
                    {anime_info["recommendations"].map((id) => 
                        <div className="recommendation" key={id}>  
                            <a href={recoms[id]["url"]} target="_blank">
                                <img src={recoms[id]["image_url"]}></img>
                            </a>
                            <a href={recoms[id]["url"]} target="_blank">
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
