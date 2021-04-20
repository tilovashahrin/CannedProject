const express = require('express'); 
const router = express.Router(); 
const cookieParser = require('cookie-parser'); 
var session = require('express-session'); 

var app = express(); 

//temporary files
const accountData = require('../models/user_model.js'); 

//middlware
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


router.get('/', function(req, res){
  res.send(accountData); 
}); 


module.exports = router; 