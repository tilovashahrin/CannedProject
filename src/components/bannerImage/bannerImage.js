import React from 'react'; 

import './bannerImage.css'; 
function BannerImage(props){
  const {image, title, description} = props; 
  console.log(image); 
  return (
    <div className="banner-image">
      <img src={image}></img>
      <div className="banner-gradient"></div>
      <div className="banner-text">
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
    </div>
  ); 
}

export default BannerImage; 