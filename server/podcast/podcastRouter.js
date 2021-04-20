const express = require('express'); 
const router = express.Router(); 
const {Review} = require('../models/review_model'); 
const {getShow, getEpisodes, searchShow} = require('./spotifyWrapper'); 
const {getPodcastReviewData} = require('./podcastProcessing'); 

router.get('/:id', function(req, res){
  getShow(req.params.id).then((data)=>{
    getPodcastReviewData(req.params.id).then((reviewData) => {
      res.send({...data.data.shows[0], ...reviewData } ); 
    })
  }); 
}); 
router.get('/:id/episodes', function(req, res){
  getEpisodes(req.params.id).then((data)=>{
    res.send(data.data); 
  }); 
}); 

router.get('/:id/reviews', function(req, res){
  Review.find({podcast: req.params.id}).then((data) => res.send(data)); 
}); 

router.post('/:id/addReview', function(req, res){
  const content = req.body; 
  console.log(content); 
  if (req.session.userID && content){
    console.log('has session'); 
    const review = new Review({
      title: content.title, 
      content: content.review, 
      podcast: req.params.id, 
      timestamp: Date.now().toString(), 
      rating: content.rating, 
      userid: req.session.userID, 
    }); 
    console.log('saving object'); 
    review.save((err) => {
      if (err){
        console.log('An error occured when trying to write a reivew'); 
        console.log(err); 
        res.send({reqStatus: false, errorMessage:'An error occured when trying to write a review.'}); 
      }
      else {
        res.send({reqStatus: true}); 
      }
    })
  }
  else {
    res.send({reqStatus: false, errorMessage:'Must be logged in.'})
  }
}); 

router.get('/search/:query', function(req, res){
  searchShow(req.params.query).then((data)=>{
    res.send(data.data); 
  }); 
}); 

module.exports = router; 