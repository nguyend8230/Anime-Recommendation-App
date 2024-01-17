import NavBar from "./NavBar";
import Recommendations from "./Recommendations";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">  
        <NavBar />
        <Switch>
          <Route exact path="/:mal_id">
            <Recommendations />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
