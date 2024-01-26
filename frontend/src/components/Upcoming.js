import { useEffect, useState } from "react";
import { fetch_data } from "../Fetch";

function Upcoming() {
    const [upcoming_animes, set_upcoming_animes] = useState([]);

    async function fetch_upcoming_animes() {
        const data = await fetch_data("https://api.jikan.moe/v4/seasons/upcoming");
        set_upcoming_animes(data.data);
    }

    useEffect(() => {
        if(!upcoming_animes.length) {
            console.log("lmao");
            fetch_upcoming_animes();
        }
    },[]);

    function test(anime) {
        console.log(anime);
    }

    return (
        <div>
            <h1>xdd</h1>
            <p>Upcoming animes</p>
            {upcoming_animes.length && upcoming_animes.map((anime) => 
                <div key={anime["mal_id"]}>
                    <p>{anime["title_english"]}</p>
                </div>
            )

            }
        </div>
    );
}

export default Upcoming;