const express = require('express'); 
const router = express.Router(); 
const {User} = require('../models/user_model'); 

//temporary files
const accountData = require('../tempData/tempAccountData.json'); 

router.get('/', function(req, res){
  res.send(accountData); 
}); 

router.post('/signup', async function(req, res){
  const content = req.body;
  const existing = await User.find({email: content.email}); 
  if (existing.length > 0){
    console.log('Account already exists.'); 
    res.send({creationStatus: false, errorMessage: 'Account Already exists.'}); 
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
      res.send({creationStatus: false, errorMessage: 'Failed to create account, try again later.'}); 
    }else{
      res.send({creationStatus: true}); 
    }
  })
  }
}); 
router.get('/test', function(req, res){
  User.find({}).then((data) => res.send(data)); 
}); 


module.exports = router; 