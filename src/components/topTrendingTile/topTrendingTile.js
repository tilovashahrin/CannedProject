import React, {useState, useEffect} from 'react'; 
import {motion, AnimatePresence } from 'framer-motion'; 
import 'react-bulma-components/dist/react-bulma-components.min.css';

//Implementation was aided from the following exmaple: 
//https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?fontsize=14&module=%2Fsrc%2FExample.tsx

function TopTrendingTile(props){
  const {startpage, images} = props;

  // const images = [
  //   './images/99invs.png', 
  //   './images/steve.jpg', 
  //   './images/adnan_syed.jpg'
  // ]; 

  const [page, setPage] = useState(startpage); 

  const anim_props = {
    enter: {
      x: 0,
      opacity: 1, 
      y: 0
    }, 
    center: {
      x: 0, 
      opacity: 1, 
      y: 0
    }, 
    exit: {
      x: 0, 
      opacity: 0,
      y: 0
    }
  }

  const anim_transition = {
    x: {type: 'Spring'},
    opacity: {duration: 0.5 }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (page + 1 >= images.length){
        setPage(0); 
      }
      else setPage(page + 1); 
    }, 1000);
    return () => clearInterval(interval);
  }, []); 

  const circleIndicator = (index) => {
    let classValues = "circle"; 
    if (index === page){
      classValues += " selected"; 
    }
    return <div className={classValues} onClick={() => setPage(index)}></div>
  }

  return <div className="">
    <AnimatePresence initial={false}>
      <motion.img className='image is-128x128'
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
    {/* <div className="selectors">
      {images.map((value, index) => circleIndicator(index))}
    </div> */}

  </div>
}


export default TopTrendingTile; 
