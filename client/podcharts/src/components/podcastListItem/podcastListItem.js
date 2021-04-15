import React, {useState, useEffect} from 'react'; 
import './podcastListItem.css'; 
//Temp podcast data 
import data from './tempPodcastData.json'; 

function PodcastListItem(props){
  const {podcastID} = props; 

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
      console.log(podcastData); 
      return podcastData.episodes.items[0]['images'][0]['url']; 
    }
  }

  return <div className="episode-list-item">
    <h4>{podcastData.name}</h4>
    <p>{podcastData.description}</p>
    <div className="episode-list-gradient"/>
    <img src={getImage()}/>

  </div>
}

export default PodcastListItem; 