import { useState} from "react";
import { Link, useHistory } from "react-router-dom"

function NavBar() {
    const history = useHistory();

    const [title, set_title] = useState("");
    
    async function fetch_data(url) {
        return new Promise((resolve,reject) => {
            fetch(url)
                .then((response) => {
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    return response.json();
                })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    async function search_anime() {
        const data = await fetch_data(`https://api.jikan.moe/v4/anime?q=${title}`);
        try {
            history.push(`/${data.data[0]["mal_id"]}`);
        }
        catch(error) {
            console.log(error);
        }
        
        // else go to error page
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
            <p>YOURAnimeList</p>
            <input 
                type="text" 
                id="search_box"
                spellCheck="false"      
                value={title}
                onKeyDown={handle_search_bar_key_down}
                onChange={(e) => set_title(e.target.value)}
                placeholder="Search anime...">
            </input>
            <button 
                className="button" 
                onClick={handle_search_button_click}>
                
            Search</button>
        </div>
    );
}

export default NavBar;