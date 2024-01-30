import { useState,useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import {fetch_data} from "../functions/Fetch";
import { LoadingContext } from "../contexts/LoadingContext";
import { display_all_animes } from "../functions/DisplayAnime";
import CurrentUpcomingAnimeToggle from "./CurrentUpcomingAnimeToggle";

function Recommendations() {
    const history = useHistory();
    const {mal_id} = useParams();
    
    // map between anime to the recommendations of that anime using mal_id
    const [recommendations, set_recommendations] = useState({});

    // store the information of each anime
    const [anime_info, set_anime_info] = useState({});

    const {loading, set_loading} = useContext(LoadingContext);
    
    useEffect(() => {
        console.log(`visited ${mal_id}`);
        async function fetch_recommendations() {
            console.log(`fetched ${mal_id}`);
            try {
                const data = await fetch_data(`http://localhost:4000/api/anime/${mal_id}/recommendations/`);
                const recoms = [];
                for(let anime of data) {
                    anime_info[anime.mal_id] = anime;
                    recoms.push(anime);
                }

                set_recommendations(recommendations => ({ ...recommendations, [mal_id]: recoms}));
                set_loading(false);
            }
            catch(error) {
                history.push("/error");
            }
        }

        if(!(mal_id in recommendations)) {
            fetch_recommendations();
        }
        else {
            set_loading(false);
        }

    },[mal_id]);

    return (
        <div className="Recommendations"> 
            <CurrentUpcomingAnimeToggle />
            {loading && <p>Loading...</p>}
            {!loading && recommendations[mal_id] && <h2>Recommendations for: {anime_info[mal_id].title}</h2>}
            {!loading && recommendations[mal_id] && display_all_animes(recommendations[mal_id])}
        </div>
    );

}

export default Recommendations;
