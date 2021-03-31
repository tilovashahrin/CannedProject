import React, {useState, useEffect, useRef} from 'react'; 
// import playImage from './images/icons/play_arrow-24px.svg'; 
import './episodeTile.css'; 

function EpisodeTile(props){
  const {episode} = props; 
  const audio = useRef(); 

  useEffect(() => {
    audio.current = new Audio(episode.audio_preview_url); 
    audio.current.addEventListener('timeupdate', () => {
      setCompletion(audio.current.currentTime/ audio.current.duration); 
    }); 
  }, []); 

  var [audioCompletion, setCompletion] = useState(0); 

  const onHandleAudio = () => {
    if (audio.current.paused){
      audio.current.play(); 
    }
    else{
      audio.current.pause(); 
    }
  }; 

  const getPlayPause = () => {
    if (audio.current == null || !audio.current.paused){
      return "./images/icons/pause-white-18dp.svg"; 
    }
    return "./images/icons/play_arrow-white-18dp.svg"; 
  }


  return <div className="episode-tile" key={episode.uri}>
    <div className="episode-progress" style={{ width: `${audioCompletion*100}%` }}></div>
    <img src={getPlayPause()}className="play-pause" onClick={() => onHandleAudio()}></img>
    <div className="episode-info">
      <h1>{episode.name}</h1>
    </div>
    <div className="episode-overlay"></div>
    <img src={episode.images[1].url}></img>
    
  </div>
}

export default EpisodeTile; 