export function display_all_animes(animes) {
    console.log(animes);
    return(
        <div className="container">
            <div className="recoms_container">
                {
                    animes.map((anime) => 
                        <div className="recommendation" key = {anime._id}> 
                            <a href={anime.url} target="_blank">
                                <img src={anime.images.webp.image_url}></img>
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