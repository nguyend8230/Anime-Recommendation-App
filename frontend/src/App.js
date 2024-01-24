import NavBar from "./NavBar";
import Recommendations from "./Recommendations";
import Error from "./Error";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import LoadingContextProvider from "./contexts/LoadingContext";

function App() {
  
  return (
    <Router>
      <div className="App">  
        <LoadingContextProvider>
          <NavBar />
          <Switch>
            <Route exact path="/anime/:mal_id">
              <Recommendations />
            </Route>
            <Route exact path="/error">
              <Error />
            </Route>

          </Switch>
        </LoadingContextProvider>
      </div>
    </Router>
  );
}

export default App;
