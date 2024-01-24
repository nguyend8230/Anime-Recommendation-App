import {useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";

import {fetch_data} from "./Fetch";
import { LoadingContext } from "./contexts/LoadingContext";

function NavBar() {

    const history = useHistory();
    const [title, set_title] = useState("");
    const {loading, set_loading} = useContext(LoadingContext);

    async function search_anime() {
        set_loading(true);
        const data = await fetch_data(`https://api.jikan.moe/v4/anime?q=${title}`);
        try {
            history.push(`/anime/${data.data[0]["mal_id"]}`);
        }
        catch(error) {
            history.push("/error");
        }
        finally {
            set_title("");
        }

    }

    function handle_logo_on_click() {
        history.push("/");
        set_title("");
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
            <h1 onClick={handle_logo_on_click}> 
                <span>YOUR</span>AnimeList
            </h1>
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