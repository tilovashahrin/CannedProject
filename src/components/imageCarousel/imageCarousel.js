import React, {useState, useEffect} from 'react'; 
import {motion, AnimatePresence } from 'framer-motion'; 

import './imageCarousel.css'; 

//Implementation was aided from the following exmaple: 
//https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?fontsize=14&module=%2Fsrc%2FExample.tsx

function ImageCarousel(props){
  const images = [
    './images/ppl1.png', 
    './images/ppl2.png',
    './images/ppl2.jpg'
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
      if (page + 1 >= images.length){
        setPage(0); 
      }
      else setPage(page + 1); 
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
