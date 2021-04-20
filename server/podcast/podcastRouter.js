const express = require('express'); 
const router = express.Router(); 
const {Review} = require('../models/review_model'); 
const {getShow, getEpisodes, searchShow} = require('./spotifyWrapper'); 

router.post('/addToFavorites', function(req, res) {
  let userID = req.session.userID; 
  if(userID){
    Review.findOneAndUpdate(
      {"id": userID}, 
      { $push: {"favPodList": req.body.podID}}, 
      function(error, success) {
        if (error) {
          console.log(error);
        }
        else {
        console.log(success);
        }
      }
    );
  }
  else{
    res.send("Please login to add this podcast to your favourites!"); 
  }
});

router.get('/:id', function(req, res){
  getShow(req.params.id).then((data)=>{
    res.send(data.data); 
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
  if (req.session.userID){
    const review = new Review({
      title: content.title, 
      content: content.content, 
      podcast: req.params.id, 
      timestamp: Date.now().toString(), 
      rating: content.rating, 
      userid: req.session.userID
    }); 

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