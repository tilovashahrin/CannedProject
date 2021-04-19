import React, {useState} from 'react'; 
import './reviewField.css';
import {Form, Button} from 'react-bulma-components';
const {Field, Label, Control, Input, Textarea} = Form; 

function ReviewField(props){
  const {author, callback} = props; 

  const [title, setTitle] = useState(''); 
  const [review, setReview] = useState(''); 
  const [score, setScore] = useState(0); 

  const onClickStar = (index) => {
    setScore(index + 1); 
  }

  const displayStars = (numSelected) => {
    let stars = []; 

    const whiteImage = "./images/icons/star_rate_white_24dp.svg"; 
    const blackImage = "./images/icons/star_rate_black_24dp.svg"; 

    for (let i = 0; i < 5; i++){
      if (i < numSelected ){
        stars.push('star-selected'); 
      }
      else stars.push('star-empty'); 
    }

    return <div className="stars">
      {
        stars.map((value, index) => 
          <img src={(index < numSelected) ? blackImage : whiteImage} className={value} alt="Star Rating" onClick={() => onClickStar(index)}/>
        ) 
      }
    </div>
  }

  const getData = () => {
    return {
      title: title, 
      review: review, 
      rating: score
    }
  }


  return <div className="review-field">  
    <Field>
      <Label>Write a Review:</Label>
      <Control className="text-field">
        <Input className="review-title" onChange={(value) => setTitle(value.target.value)} value={title} placeholder="Title"/>
      </Control>
      <Control className="text-field">
        <Textarea className="review-body" onChange={(value) => setReview(value.target.value)} value={review} placeholder="Review:"/>
      </Control>
    </Field>
    {displayStars(score)}
    <Button onClick={() => callback(getData())}>Share</Button>
  </div>
}

export default ReviewField; 