import React, { useState, useEffect, useLayoutEffect} from "react";
import { useHistory, Link } from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Navbar, Form, Box} from 'react-bulma-components';
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
  const [isMobile, setMobile] = useState(window.innerWidth< 1050); 
  const [isActive, setActive] = useState(false); 

  var [searchQuery, setSearchQuery] = useState('');
  var [showLogin, setLogin] = useState(false); 

  useLayoutEffect(() => {
    const checkMobile = () => setMobile(window.innerWidth < 1050); 
    window.addEventListener('resize', checkMobile); 
  }, []); 

  history.listen((_, __) => {
    setActive(false); 
  })

  const onEnterSearch = (e) => {
    if (e.key === 'Enter') {
      if (searchQuery !== '') {
        history.push({ pathname: '/search', state: { query: searchQuery } });
        setSearchQuery('');
      }
    }
  }

  const mobileNav = () => {
    return <div>
      <Navbar className="nav">
        <Navbar.Brand>
          <Navbar.Item randerAs="a" href="#">
            <Link to={'/'}>
              <p className="title">Canned Pods</p>
            </Link>
          </Navbar.Item>
          <Navbar.Burger className={isActive? 'is-active': ''} onClick={() => setActive(!isActive)}/>
        </Navbar.Brand>
      </Navbar>
      <Box className={isActive? '' : 'hide'}>
        <li>
          {
            routes.map((item) => <ul>{navItem(item)}</ul>)
          }
        </li>
        <Login removePannel={() => setLogin(false)}/>
      </Box>
      <Input className="search-bar"
        placeholder="search"
        onChange={(text) => setSearchQuery(text.target.value)}
        value={searchQuery}
        onKeyDown={onEnterSearch}
      ></Input>
    </div>
  }

  const wideNav = () => {
    return <Navbar className="nav">
      <Navbar.Brand>
        <Navbar.Item randerAs="a" href="#">
          <Link to={'/'}>
            <p className="title">Canned Pods</p>
          </Link>
        </Navbar.Item>
        <Navbar.Burger className={isActive? 'is-active': ''} onClick={() => setActive(!isActive)}/>
      </Navbar.Brand>
      <Navbar.Menu id="menuItems">
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
  }

  return (
    (isMobile) ? mobileNav() : wideNav()
  );
}

export default NavBar;

