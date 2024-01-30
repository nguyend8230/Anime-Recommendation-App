import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";

function CurrentUpcomingAnimeToggle() {
    const {mal_id} = useParams();
    // console.log()
    return (
        <div>
            <Link to={`/anime/${mal_id}/recommendations`}>Current </Link>
            <Link to={`/anime/${mal_id}/recommendations/upcoming`}>Upcoming</Link>
        </div>
    );
}

export default CurrentUpcomingAnimeToggle;