export function display_all_animes(animes) {
    return(
        <div className="container">
            <div className="recoms_container">
                {
                    animes.map((anime) => 
                        <div className="recommendation" key = {anime.mal_id}> 
                            <a href={anime.url} target="_blank">
                                <img src={anime.image_url}></img>
                            </a>
                            <a href={anime.url} target="_blank">
                                {anime.title}
                            </a>
                        </div>
                    )
                }
            </div>
        </div>
    );
}