const express = require('express'); 
const router = express.Router(); 
const {Review} = require('../models/review_model'); 
const {getShow, getEpisodes, searchShow} = require('./spotifyWrapper'); 
const cookieParser = require('cookie-parser'); 
var session = require('express-session'); 

//temporary files
const podcastData = require('../models/podcast_model.js'); 
const reviewData = require('../models/review_model.js'); 
const searchData = require('../tempData/searchResults.json'); 
const accountData = require('../models/user_model.js');

var app = express(); 

app.use(express.static('public'));
app.use(cookieParser()); 

app.post('/addToFavorites', function(req, res) {
  let userID = req.session.userID; 
  if(userID){
    accountData.findOneAndUpdate(
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
  Review.find({}).then((data) => res.send(data)); 
})

router.get('/search/:query', function(req, res){
  searchShow(req.params.query).then((data)=>{
    res.send(data.data); 
  }); 
}); 

module.exports = router; 