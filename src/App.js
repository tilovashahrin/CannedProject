import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './components/navbar/navbar';

import Home from './pages/home/home';
import Account from './pages/account/account';
import Podcast from './pages/podcast/podcast';
import Search from './pages/search/search';
import SignUp from './pages/signUp/signup';
import Trending from './pages/trending/trending';
import './App.css';

function App(props) {
  return (
    <div className="App">

      <Router>
        <NavBar location={props.location} />

        <Switch>
          <Route path="/podcast" component={Podcast} />
          <Route path="/account" component={Account} />
          <Route path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/search" component={Search} />
          <Route path='/signup' component={SignUp} />
          <Route path="/trending" component={Trending} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
