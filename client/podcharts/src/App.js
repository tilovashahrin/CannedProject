import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './components/navbar/navbar';

import Home from './pages/home/home'; 
import Account from './pages/account/account'; 
import Podcast from './pages/podcast/podcast'; 
import './App.css';

function App() {
  return (
    <div className="App">

    <Router>
      <NavBar/>

      <Switch>
      <Route path="/podcast">
          <Podcast/>
        </Route>
      <Route path="/account">
          <Account/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>

      </Switch>
    </Router>

    </div>
  );
}

export default App;
