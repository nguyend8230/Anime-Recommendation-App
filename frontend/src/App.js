import NavBar from "./NavBar";
import Recommendations from "./Recommendations";
import Error from "./Error";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";

function App() {
  
  return (
    <Router>
      <div className="App">  
        <NavBar />
        <Switch>
          <Route exact path="/anime/:mal_id">
            <Recommendations />
          </Route>
          <Route exact path="/error">
            <Error />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
