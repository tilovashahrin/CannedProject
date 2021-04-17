import React, {useState, useEffect} from 'react'; 
import {motion, AnimatePresence } from 'framer-motion'; 

import './imageCarousel.css'; 

function ImageCarousel(props){
  const images = [
    'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/03/fate-saber-featured.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5', 
    'https://besthqwallpapers.com/Uploads/23-4-2020/130105/thumb2-artoria-pendragon-battle-fate-grand-order-saber-alter-artwork.jpg',
    'https://www.wallpaperup.com/uploads/wallpapers/2016/09/04/1014973/cbb08c6b4e1582ccff1a8a523e125fcd.jpg'
  ]; 

  const [page, setPage] = useState(0); 

  const anim_props = {
    enter: {
      x: 1000,
      opacity: 0, 
      y: 0
    }, 
    center: {
      x: 0, 
      opacity: 1, 
      y: 0
    }, 
    exit: {
      x: -1000, 
      opacity: 0
    }
  }

  const anim_transition = {
    x: {type: 'spring'},
    opacity: {duration: 0.5 }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((page + 1)% images.length); 
    }, 7000);
    return () => clearInterval(interval);
  }, []); 

  const circleIndicator = (index) => {
    let classValues = "circle"; 
    if (index === page){
      classValues += " selected"; 
    }
    return <div className={classValues} onClick={() => setPage(index)}></div>
  }

  return <div className="image-carousel">
    <AnimatePresence initial={false}>
      <motion.img className="carousel-images"
        key={page}
        src={images[page]}
        variants={anim_props} 
        initial="enter"
        animate="center"
        exit="exit" 
        tranition={anim_transition}
        onClick={() => setPage((page+1)%images.length)}
      />
    </AnimatePresence>
    <div className="selectors">
      {images.map((value, index) => circleIndicator(index))}
    </div>

  </div>
}


export default ImageCarousel; 
