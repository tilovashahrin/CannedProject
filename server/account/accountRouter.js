const express = require('express'); 
const router = express.Router(); 
<<<<<<< HEAD
const cookieParser = require('cookie-parser'); 
var session = require('express-session'); 

var app = express(); 
=======
const {User} = require('../models/user_model'); 
>>>>>>> 21328343f33fbda7a8dedc5171cd5dca24d21e44

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


router.get('/', async function(req, res){
  if (req.session.userID){
    const document = await User.findById(req.session.userID); 
    const data = {
      name: document.name, 
      email: document.email, 
      favPodList: document.favPodList, 
      reviewHistory: [0,0,0,0,0,0,0,0,0,0,0,0]
    }; 
    res.send({reqStatus: true, data: data}); 
  }
  else {
    res.send({reqStatus: false, errorMessage:'Must be logged in.'})
  }
}); 

router.post('/signup', async function(req, res){
  const content = req.body;
  const existing = await User.find({email: content.email}); 
  if (existing.length > 0){
    console.log('Account already exists.'); 
    res.send({reqStatus: false, errorMessage: 'Account Already exists.'}); 
    return; 
  } 
  else {
    const user = new User({
    name: content.name, 
    email: content.email, 
    password: content.password, 
    favPodList: []
  }); 
  user.save((err) => {
    if (err){
      console.log('There was an error creating an account'); 
      console.log(err); 
      res.send({reqStatus: false, errorMessage: 'Failed to create account, try again later.'}); 
    }else{
      res.send({reqStatus: true}); 
    }
  })
  }
});

router.post('/signin', async function(req, res){
  const content = req.body; 
  const findUser = await User.find({email: content.email});
  if (findUser.length === 0){
    res.send({reqStatus: false, errorMessage: 'Incorrect email or password'}); 
  }else {
    if (findUser[0].password === content.password){
      req.session.userID = findUser[0]._id; 
      res.send({reqStatus: true}); 
    }
    else {
      res.send({reqStatus: false, errorMessage: 'Incorrect email or password'}); 
    }
  }
}); 

router.get('/signout', function(req, res){
  req.session.userID = null; 
  res.send({reqStatus: true}); 
}); 


router.get('/test', function(req, res){
  User.find({}).then((data) => res.send(data)); 
}); 


module.exports = router; 