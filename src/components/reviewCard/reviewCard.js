import React from 'react'; 
import {Card, Media, Content, Heading} from 'react-bulma-components'; 

import './reviewCard.css'; 

function ReviewCard(props){

  const {review} = props; 
  console.log(review); 

  return <div className="review-card">
    <Card>
      <Card.Content>
        <Media.Item>
          <Heading size={4}>{review.title}</Heading>
          <Heading subtitle size={6}>{review.author}</Heading>
        </Media.Item>
        <Content className="content">
          {review.content}
        </Content>
      </Card.Content>
    </Card>
  </div>
}

export default ReviewCard; 