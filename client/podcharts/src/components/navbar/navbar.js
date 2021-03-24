import React from "react"; 
import {Link } from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Navbar} from 'react-bulma-components'; 

function navItem(props){
  return (
    <Navbar.Item >
      <Link to={props.target}>{props.name}</Link>
    </Navbar.Item>
  ); 
}

function NavBar(props){
  const routes = [
    {name: 'Home', target:'/'}, 
    {name: 'Account', target:'/account'}, 
    {name: 'Sign Up', target:'/signup'}, 
    {name: 'Trending', target:'/trending'}
  ]
  return(
      <Navbar>
        <Navbar.Menu>
          {routes.map((item) => navItem(item))}
        </Navbar.Menu>
      </Navbar>

  
  ); 
}

export default NavBar; 

