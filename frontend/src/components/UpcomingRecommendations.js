import { useParams } from "react-router-dom";
import { fetch_data } from "../functions/Fetch";
import { useEffect, useState } from "react";
import { display_all_animes } from "../functions/DisplayAnime";

function UpcomingRecommendations() {
    const {mal_id} = useParams();
    const [upcoming_recoms, set_upcoming_recoms] = useState([]);
    
    useEffect(() => {
        async function fetch_upcoming_recommendations() {
            const data = await fetch_data(`http://localhost:5000/api/anime/${mal_id}/recommendations/upcoming`);
            console.log(data);
            set_upcoming_recoms(data.data);
            console.log(upcoming_recoms);

        }

        fetch_upcoming_recommendations();
        
    },[]);
    return (
        <div>
            <p>xdd</p>
            {upcoming_recoms && display_all_animes(upcoming_recoms)}
        </div>
    );
}

export default UpcomingRecommendations;