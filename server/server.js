const express = require('express'); 
const session = require('express-session'); 
const cors = require('cors'); 
const {v4: uuidv4} = require('uuid'); 

let podcastRoute = require('./podcast/podcastRouter'); 
let accountRoute = require('./account/accountRouter'); 

//temp data
const tempTrendingData = require('./tempData/tempTrending.json'); 

let app = express(); 
app.use(cors()); 
app.use('/podcasts', podcastRoute);
app.use('/account', accountRoute);  

app.use(session({
  genid: () => uuidv4(), 
  resave: false, 
  saveUninitialized: false, 
  cookie: {secure: true},
  secret: 'some secret'
})); 

app.get('/trending', function(req, res){
  res.send(tempTrendingData); 
}); 
app.get('/api', (req, res) => res.send(app.routes)); 


app.set('port', process.env.PORT || 8080); 
app.listen(app.get('port'), function(){
  console.log(`Listening on port ${app.get('port')}`); 
})