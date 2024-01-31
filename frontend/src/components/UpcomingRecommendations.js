import { useParams,useHistory } from "react-router-dom";
import { fetch_data } from "../functions/Fetch";
import { useEffect, useState } from "react";
import { display_all_animes } from "../functions/DisplayAnime";
import CurrentUpcomingAnimeToggle from "./CurrentUpcomingAnimeToggle";

function UpcomingRecommendations() {
    const {mal_id} = useParams();
    const [upcoming_recoms, set_upcoming_recoms] = useState([]);
    const history = useHistory();
    
    useEffect(() => {
        async function fetch_upcoming_recommendations() {
            try {
                const data = await fetch_data(`http://localhost:5000/api/anime/${mal_id}/recommendations/upcoming`);
                set_upcoming_recoms(data.data);
            }
            catch(error) {
                history.push("/error"); 
            }
        }

        fetch_upcoming_recommendations();
        
    },[]);
    return (
        <div>
            <CurrentUpcomingAnimeToggle />
            {upcoming_recoms && display_all_animes(upcoming_recoms)}
        </div>
    );
}

export default UpcomingRecommendations;