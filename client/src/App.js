import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Home from './components/Home'

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Navbar />
      <Switch>
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
        <Route exact path="/users/:u_id/campaigns/:c_id/story">
          <Story />
        </Route>
        <Route exact path="/users/:u_id/campaigns/:c_id/party">
          <Party />
        </Route>
        <Route exact path="/users/:u_id/campaigns/:c_id/npcs">
          <NPCList />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
