import React, {useState, useEffect} from "react";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Media, Content, Heading, Image, Section, Container } from 'react-bulma-components';
import "./trendingItem.css"
import { useHistory } from 'react-router-dom';
import Loading from '../loading/loading'; 
import { motion, useAnimation } from 'framer-motion';

function TrendingItem(props) {
  // const { title, image, description, rating, creator } = props
  const { pod, fav, callback } = props
  const history = useHistory();
  console.log(pod); 
  const image = pod.images[0]['url'];
  const title = pod.name;
  const description = pod.description;
  const creator = pod.publisher;
  const podcastID = pod.id;

  const rating = pod.rating; // pod.rating
  // console.log(image)
  const [episodes, setEpisodes] = useState([]); 
  const onClickItem = () => {
    history.push({ pathname: '/podcast', state: { podcastID: podcastID } });
  }


  const getEpisodes = () => {
    fetch(`http://localhost:8080/podcasts/${pod.id}/episodes`)
    .then(response => response.json())
    .then((data)=>{
      console.log(data); 
      setEpisodes(data); 
    }); 
  }
  useEffect(() => {
    getEpisodes(); 
  }, []); 

  const toggleFav = () => {
    return podcastID
  }

  const displaystars = (rating) => {
    const whitestar = "./images/icons/star_rate_white_24dp.svg";
    const blackstar = "./images/icons/star_rate_black_24dp.svg";

    var stars = []
    for (let i = 1; i < 6; i++) {
      if (i <= rating) {
        stars.push(true)
      } else {
        stars.push(false)
      }
    }

    return <div className="stars content">
      {stars.map((value, index) =>
        <img src={(value) ? blackstar : whitestar} />
      )}
    </div>
  }
  if (episodes.length === 0) 
    return <Loading/>

  return (
    <Card id="cardItem" className="columns container ">
      <Card.Content className="column " >
        <Media>
          <Media.Item renderAs="figure" position="left" onClick={onClickItem}>
            <Image src={image} size={128} />
          </Media.Item>

          <Media.Item>
            <Heading size={4} onClick={onClickItem}>{title}</Heading>
            <Heading subtitle size={6}>By {creator}</Heading>
            <p>Description: {description}</p>
          </Media.Item>

          <Media.Item position="right ">
            <div className="content ">
              <h2>Rating {rating} / 5</h2>
              {displaystars(rating)}
            </div>
            {(fav) ? <button className="button" onClick={() => callback(toggleFav())}><img src="./images/icons/filled_heart.svg" /><div>Remove from Fav</div></button> :
              <button className="button is-danger " onClick={() => callback(toggleFav())}><img src="./images/icons/empty_heart.svg" />Add to Fav</button>
            }

          </Media.Item>
        </Media>
        <Content className="content">
          <div className="banner-image" onClick={onClickItem}>
            <img height="50" src={episodes.items[0].images[0].url}></img>
            <div className="banner-gradient"></div>
            <div className="banner-text">
              <h2 style={{ color: "white" }} > Episode {episodes.length}:  {episodes.items[0].name}</h2>
              <h3 style={{ color: "white" }}>{episodes.items[0].description.slice(0, 128) + '...'}</h3>
            </div>
          </div>

        </Content>
      </Card.Content>

    </Card>
  );
}



export default TrendingItem;