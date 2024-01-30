import NavBar from "./components/NavBar";
import Recommendations from "./components/Recommendations";
import Error from "./components/Error";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import LoadingContextProvider from "./contexts/LoadingContext";
import MainPage from "./components/MainPage";
import Upcoming from "./components/Upcoming";
import UpcomingRecommendations from "./components/UpcomingRecommendations";

function App() {
  
  return (
    <Router>
      <div className="App">  
        <LoadingContextProvider>
          <NavBar />
          <Switch>             
            <Route exact path="/">
              <MainPage/>
            </Route>           
            <Route exact path="/anime/:mal_id/recommendations">
              <Recommendations/>
            </Route>           
            <Route exact path="/anime/:mal_id/recommendations/upcoming">
              <UpcomingRecommendations/>
            </Route>
            <Route exact path="/upcoming">
              <Upcoming/>
            </Route>
            <Route exact path="/error">
              <Error/>
            </Route>
          </Switch>
        </LoadingContextProvider>
      </div>
    </Router>
  );
}

export default App;
