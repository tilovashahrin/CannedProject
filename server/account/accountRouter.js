const express = require('express'); 
const router = express.Router(); 

//temporary files
const accountData = require('../tempData/tempAccountData.json'); 

router.get('/', function(req, res){
  res.send(accountData); 
}); 


module.exports = router; 