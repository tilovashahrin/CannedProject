const express = require('express'); 
const router = express.Router(); 

//temporary files
const podcastData = require('../tempData/tempPodcastData.json'); 
const reviewData = require('../tempData/tempReviewData.json'); 
const searchData = require('../tempData/searchResults.json'); 


router.get('/:id', function(req, res){
  console.log('getting data'); 
  res.send(podcastData); 
}); 

router.get('/:id/reviews', function(req, res){
  res.send(reviewData); 
})

router.get('/search/:query', function(req, res){
  res.send(searchData); 
}); 

module.exports = router; 