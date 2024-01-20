import {useState} from "react";
import {useHistory} from "react-router-dom";

import {fetch_data} from "./Fetch";

function NavBar() {

    const history = useHistory();
    const [title, set_title] = useState("");

    async function search_anime() {
        const data = await fetch_data(`https://api.jikan.moe/v4/anime?q=${title}`);
        try {
            history.push(`/anime/${data.data[0]["mal_id"]}`);
        }
        catch(error) {
            history.push("/error");
        }

    }
    async function handle_search_bar_key_down(event) {
        if(event.key == "Enter") {
            search_anime();
        }
    }
    async function handle_search_button_click() {
        search_anime();
    }

    return(
        <div className="NavBar">
            <h1><span>YOUR</span>AnimeList</h1>
            <div className="search_package">
                <input 
                    type="text" 
                    id="search_box"
                    spellCheck="false"      
                    value={title}
                    onKeyDown={handle_search_bar_key_down}
                    onChange={(e) => set_title(e.target.value)}
                    placeholder="Search anime..."
                >
                </input>
                <button 
                    className="button" 
                    onClick={handle_search_button_click}
                    id="search_button"
                >
                Search
                </button>
            </div>
            
        </div>
    );
}

export default NavBar;