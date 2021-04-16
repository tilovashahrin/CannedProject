import React, {useState} from "react"; 
import {useHistory, Link} from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Navbar, Form} from 'react-bulma-components'; 

import './navbar.css'; 
const {Input} = Form; 

function navItem(props){
  return (
    <Navbar.Item key={props.name}>
      <Link to={props.target}>
        {props.name}
      </Link>
    </Navbar.Item>
  ); 
}

function NavBar(props){
  const routes = [
    {name: 'Home', target:'/'}, 
    {name: 'Following', target:'/following'},
    {name: 'Account', target:'/account'}, 
    {name: 'Sign Up', target:'/signup'}
  ]; 
  const history = useHistory(); 

  var [searchQuery, setSearchQuery] = useState(''); 
  const onEnterSearch = (e) => {
    if (e.key === 'Enter'){
      if (searchQuery !== ''){
        history.push({pathname: '/search', state:{query: searchQuery}}); 
        setSearchQuery(''); 
      }
    }
  }

  return(
    <Navbar className="nav">
      <Navbar.Menu>
        {routes.map((item) => navItem(item))}
      </Navbar.Menu>
      <Input className="search-bar" 
              placeholder="search" 
              onChange={(text) => setSearchQuery(text.target.value)} 
              value={searchQuery}
              onKeyDown={onEnterSearch}
              ></Input>
    </Navbar>
  ); 
}

export default NavBar; 

