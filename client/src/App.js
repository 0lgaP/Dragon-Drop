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
      </Switch>
    </div>
    </Router>
  );
}

export default App;
