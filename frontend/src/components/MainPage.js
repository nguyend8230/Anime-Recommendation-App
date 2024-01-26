
import { Link } from "react-router-dom";
function MainPage() {
    return(
        <div>
            <p>This is the main page</p>
            <Link to="/upcoming"> Upcoming animes</Link>
        </div>
    );
}

export default MainPage;