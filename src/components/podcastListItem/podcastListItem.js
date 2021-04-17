import React, {useState, useEffect} from 'react'; 
import {useHistory} from 'react-router-dom'; 
import './podcastListItem.css'; 
//Temp podcast data 

function PodcastListItem(props){
  const {podcastID} = props; 
  const history = useHistory(); 

  let [podcastData, setPodcastData] = useState({}); 

  useEffect(() => {
    fetch(`http://localhost:8080/podcasts/${podcastID}`)
    .then(response => response.json())
    .then((data)=>{
      console.log(data); 
      setPodcastData(data.shows[0]); 
    }); 
  }, [])

  const getImage = () => {
    if (Object.keys(podcastData).length === 0){
      return ""; 
    }
    else{
      return podcastData['images'][0]['url']; 
    }
  }

  const onClickItem = () => {
    history.push({pathname: '/podcast', state:{podcastID: podcastID}}); 
  }

  return <div className="episode-list-item" onClick={onClickItem}>
    <h4>{podcastData.name}</h4>
    <p>{podcastData.description}</p>
    <div className="episode-list-gradient"/>
    <img src={getImage()}/>

  </div>
}

export default PodcastListItem; 