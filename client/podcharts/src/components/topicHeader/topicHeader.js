import React from 'react'; 
import './topicHeader.css'; 
function TopicHeader(props){
  const {text} = props; 

  return <div className='topic-header'>
    <h6>{text}</h6>
    <div className="topic-underline" style={{ width: `${text.length * 2}rem`}}></div>
  </div>
}

export default TopicHeader; 