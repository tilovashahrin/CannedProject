const express = require('express');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');


let podcastRoute = require('./podcast/podcastRouter');
let accountRoute = require('./account/accountRouter');

const { getTopPodcasts } = require('./podcast/podcastProcessing');

const {topRated, topReviewed, topFav} = getTopPodcasts();

//temp data
const tempTrendingData = require('./tempData/tempTrending.json');
const userData = require('./tempData/tempAccountData.json');
const reviewData = require('./tempData/tempReviewData.json')


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

app.get('/home', function (req, res) {
  getTopPodcasts().then(data => {
    console.log('here at /home')
    console.log(data.topRated)
    const reviews = reviewData.items;
    if (reviewData.items.length > 4) {
      reviews = reviewData.items.slice(0, 4)
    }
    res.send({ "podcasts": data, "user": userData, "review": reviews });
  }).catch(e => {e})
});

app.get('/trending', function (req, res) {
  getTopPodcasts().then(data => {
    console.log('here at /trending')
    console.log(data.topRated)
    const reviews = reviewData.items;
    if (reviewData.items.length > 4) {
      reviews = reviewData.items.slice(0, 4)
    }
    res.send({ "favouritePodList": data.topRated, "trendingPodList": data.topReviewed });
  }).catch(e => {e})
});

app.use('/podcasts', podcastRoute);
app.use('/account', accountRoute);


app.get('/api', (req, res) => res.send(app.routes));


app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function () {
  console.log(`Listening on port ${app.get('port')}`);
});

