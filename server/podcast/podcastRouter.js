const express = require('express'); 
const router = express.Router(); 
const {Review} = require('../models/review_model'); 
const {getShow, getEpisodes, searchShow} = require('./spotifyWrapper'); 

//temporary files
const podcastData = require('../tempData/tempPodcastData.json'); 
const reviewData = require('../tempData/tempReviewData.json'); 
const searchData = require('../tempData/searchResults.json'); 


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
  Review.find({}).then((data) => res.send(data)); 
})

router.get('/search/:query', function(req, res){
  searchShow(req.params.query).then((data)=>{
    res.send(data.data); 
  }); 
}); 

module.exports = router; 