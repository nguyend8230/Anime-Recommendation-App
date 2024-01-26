import { useEffect, useState } from "react";
import { fetch_data } from "../functions/Fetch";
import { display_all_animes } from "../functions/DisplayAnime";

function Upcoming() {
    const [upcoming_animes, set_upcoming_animes] = useState([]);

    async function fetch_upcoming_animes() {
        const data = await fetch_data("https://api.jikan.moe/v4/seasons/upcoming");
        set_upcoming_animes(data.data);
    }

    useEffect(() => {
        if(!upcoming_animes.length) {
            fetch_upcoming_animes();
        }
    },[]);

    return (
        <div>
            <h2>Upcoming animes:</h2>
            {upcoming_animes && display_all_animes(upcoming_animes)}
        </div>
    );
}

export default Upcoming;