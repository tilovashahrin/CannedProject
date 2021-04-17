import React from "react";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Media, Content, Heading, Image, Section, Container } from 'react-bulma-components';
import "./trendingItem.css"
import { useHistory } from 'react-router-dom';
import {motion, useAnimation} from 'framer-motion'; 

function TrendingItem(props) {
  // const { title, image, description, rating, creator } = props
  const { pod } = props
  const history = useHistory();

  const image = pod.images[0]['url'];
  const title = pod.name;
  const description = pod.description;
  const creator = pod.publisher;
  const id = pod.id;
  const newepisode = pod.episodes.items[0];
  const rating = 4.5; // pod.rating

  // console.log(image)

  const onClickItem = () => {
    history.push({ pathname: '/podcast', state: { podcastID: id } });
  }

  const displaystars = (rating) => {
    const whitestar = "./images/icons/star_rate_white_24dp.svg";
    const blackstar = "./images/icons/star_rate_black_24dp.svg";

    var stars = []
    for (let i = 1; i < 6; i++) {
      if (i < rating) {
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
          </Media.Item>
        </Media>
        <Content className="content">
          <div className="banner-image" onClick={onClickItem}>
            <img height="50" src={newepisode.images[0].url}></img>
            <div className="banner-gradient"></div>
            <div className="banner-text">
              <h2 style={{ color: "white" }} > Episode {pod.episodes.items.length}:  {newepisode.name}</h2>
              <h3 style={{ color: "white" }}>{newepisode.description.slice(0, 128) + '...'}</h3>
            </div>
          </div>

        </Content>
      </Card.Content>

    </Card>
  );
}



export default TrendingItem;