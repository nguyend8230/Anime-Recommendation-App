import { createContext, useState } from "react";

export const AnimeInfoContext = createContext();

function AnimeInfoContextProvider(props) {
    const [anime_info, set_anime_info] = useState({});

    return(
        <AnimeInfoContextProvider value={{anime_info,set_anime_info}}>
            {props.children}
        </AnimeInfoContextProvider>
    );
}

export default AnimeInfoContextProvider;