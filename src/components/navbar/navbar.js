import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Navbar, Form } from 'react-bulma-components';
import Login from '../../components/login/login';

import './navbar.css';
const { Input } = Form;

function navItem(props) {
  return (
    <Navbar.Item key={props.name}>
      <Link to={props.target}>
        {props.name}
      </Link>
    </Navbar.Item>
  );
}

function NavBar(props) {
  const routes = [
    { name: 'Home', target: '/' },
    { name: 'Account', target: '/account' },
    { name: 'Trending', target: '/trending' }
  ];
  const history = useHistory();

  var [searchQuery, setSearchQuery] = useState('');
  var [showLogin, setLogin] = useState(false); 
  const onEnterSearch = (e) => {
    if (e.key === 'Enter') {
      if (searchQuery !== '') {
        history.push({ pathname: '/search', state: { query: searchQuery } });
        setSearchQuery('');
      }
    }
  }

  return (
    <Navbar className="nav">
      <Navbar.Brand>
        <Navbar.Item randerAs="a" href="#">
          <Link to={'/'}>
            <p className="title">Canned Pods</p>
          </Link>
        </Navbar.Item>
      </Navbar.Brand>
      <Navbar.Menu>
        {routes.map((item) => navItem(item))}
      </Navbar.Menu>
      <Input className="search-bar"
        placeholder="search"
        onChange={(text) => setSearchQuery(text.target.value)}
        value={searchQuery}
        onKeyDown={onEnterSearch}
      ></Input>
      <Navbar.Item className={showLogin? "is-outlined": ""} randerAs="a" href="#" onClick={() => setLogin(!showLogin)}>
          <Link>
            Log in / Register
          </Link>
        </Navbar.Item>
      {(showLogin)? <Login removePannel={() => setLogin(false)}/>: null}
    </Navbar>

  );
}

export default NavBar;

