import React from 'react'; 
import {Card, Media, Content, Heading} from 'react-bulma-components'; 

import './reviewCard.css'; 

function ReviewCard(props){

  const {review} = props; 
  console.log(review); 
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

    return <div className="stars">
      {stars.map((value, index) =>
        <img src={(value) ? blackstar : whitestar} />
      )}
    </div>
  }

  return <div className="review-card">
    <Card>
      <Card.Content>
        <Media.Item>
          <Heading size={4}>{review.title}</Heading>
          <Heading subtitle size={6}>{review.author}</Heading>
        </Media.Item>
          <Media.Item position="right">
          {displaystars(review.rating)}
          </Media.Item>
        <Content className="content">
          {review.content}
        </Content>
      </Card.Content>
    </Card>
  </div>
}

export default ReviewCard; 