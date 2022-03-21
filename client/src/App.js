import { React, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useToken from "./hooks/useToken";
import useApplicationData from "./hooks/useApplicationData";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import CampaignList from "./components/campaign/CampaignList";
import CampaignDetails from "./components/campaign/CampaignDetails";
import MapList from "./components/campaign/MapList";
import MapDetails from "./components/campaign/MapDetails";
import Story from "./components/campaign/Story";
import PlayerList from "./components/campaign/PlayerList";
import NPCList from "./components/campaign/NPCList";

function App() {
  const { token, setToken } = useToken();

  const { state } = useApplicationData;

  return (
    <Router>
      <div className="App">
        <Header token={token} />
        <Navbar token={token} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login setToken={setToken} />
            </Route>
            <Route path="/register">
              <Register setToken={setToken} />
            </Route>
            <Route exact path="/users/:u_id">
              <Profile />
            </Route>
            <Route exact path="/users/:u_id/campaigns">
              <CampaignList />
            </Route>
            <Route exact path="/users/:u_id/campaigns/:c_id">
              <CampaignDetails />
            </Route>
            <Route exact path="/users/:u_id/campaigns/:c_id/maps">
              <MapList />
            </Route>
            <Route exact path="/users/:u_id/campaigns/:c_id/maps/:m_id">
              <MapDetails />
            </Route>
            <Route exact path="/users/:u_id/campaigns/:c_id/story">
              <Story />
            </Route>
            <Route exact path="/users/:u_id/campaigns/:c_id/party">
              <PlayerList />
            </Route>
            <Route exact path="/users/:u_id/campaigns/:c_id/npcs">
              <NPCList />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
