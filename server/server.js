const express = require('express');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');


let podcastRoute = require('./podcast/podcastRouter');
let accountRoute = require('./account/accountRouter');

//temp data
const tempTrendingData = require('./tempData/tempTrending.json');
const userData = require('./tempData/tempAccountData.json');
const reviewData = require('./tempData/tempReviewData.json')
const loggedin = true; // check if user is loggedin

const {getTopPodcasts} = require('./podcast/podcastProcessing'); 

let app = express(); 
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(cookieParser());
app.use(session({
  genid: () => uuidv4(),
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  secret: 'some secret'
}));

// app.get('/home', function (req, res) {
//   const reviews = reviewData.items
//   if (reviewData.items.length > 4) {
//     reviews = reviewData.items.slice(0, 4)
//   }
//   console.log(reviews)
//   res.send({ "podcasts": tempTrendingData, "user": userData, "review": reviews });
// });

app.use('/podcasts', podcastRoute);
app.use('/account', accountRoute);

app.get('/home', function(req, res){
  getTopPodcasts().then(data => {
    res.send({"podcasts": data}); 
  }); 
  
}); 

app.get('/api', (req, res) => res.send(app.routes));


app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function () {
  console.log(`Listening on port ${app.get('port')}`);
});

