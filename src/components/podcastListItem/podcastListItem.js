import React, {useState, useEffect} from 'react'; 
import {useHistory} from 'react-router-dom'; 
import './podcastListItem.css'; 
//Temp podcast data 
import data from './tempPodcastData.json'; 

function PodcastListItem(props){
  const {podcastID} = props; 
  const history = useHistory(); 

  let [podcastData, setPodcastData] = useState({}); 

  useEffect(() => {
    // fetch podcast using podcastID 
    setPodcastData(data); 
  }, [])

  const getImage = () => {
    if (Object.keys(podcastData).length === 0){
      return ""; 
    }
    else{
      return podcastData.episodes.items[0]['images'][0]['url']; 
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