import { React, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import Example from "./components/map/Example";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const { state } = useApplicationData;

  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/testMcTest">
              <DndProvider backend={HTML5Backend}>
                <Example />
              </DndProvider>
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
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
