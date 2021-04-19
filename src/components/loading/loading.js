import React from 'react'; 
import {Loader} from 'react-bulma-components'; 
import './loading.css'; 
function Loading(){
  const text = "Loading ..."; 

  return (
    <div className="loading">
      <Loader className="loading-circle"></Loader> 
      <p>Loading...</p>
    </div>
  ); 
}

export default Loading; 