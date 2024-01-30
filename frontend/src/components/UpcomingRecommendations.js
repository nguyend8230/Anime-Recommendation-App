import { useParams } from "react-router-dom";
import { fetch_data } from "../functions/Fetch";
import { useEffect, useState } from "react";
import { display_all_animes } from "../functions/DisplayAnime";
import CurrentUpcomingAnimeToggle from "./CurrentUpcomingAnimeToggle";

function UpcomingRecommendations() {
    const {mal_id} = useParams();
    const [upcoming_recoms, set_upcoming_recoms] = useState([]);
    
    useEffect(() => {
        async function fetch_upcoming_recommendations() {
            const data = await fetch_data(`http://localhost:5000/api/anime/${mal_id}/recommendations/upcoming`);
            set_upcoming_recoms(data.data);
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