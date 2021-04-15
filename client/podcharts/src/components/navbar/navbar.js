import React from "react"; 
import {Link } from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Navbar, Form} from 'react-bulma-components'; 

import './navbar.css'; 
const {Input} = Form; 

function navItem(props){
  return (
    <Navbar.Item key={props.name} to={props.target}>
      {props.name}
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
    <Navbar className="nav">
      <Navbar.Menu>
        {routes.map((item) => navItem(item))}
      </Navbar.Menu>
      <Input className="search-bar" placeholder="search"></Input>
    </Navbar>
  
  ); 
}

export default NavBar; 

