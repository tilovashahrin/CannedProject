const express = require('express');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');


let podcastRoute = require('./podcast/podcastRouter');
let accountRoute = require('./account/accountRouter');

<<<<<<< HEAD
const { MongoClient } = require('mongodb');
const secrets = require('./secrets.json');
const uri = `mongodb+srv://${secrets.mongodb.username}:${secrets.mongodb.password}@cluster0.1hv4s.mongodb.net/CannedPods?retryWrites=true&w=majority`
const client = new MongoClient(uri);

const { getTopPodcasts } = require('./podcast/podcastProcessing');

const {topRated, topReviewed, topFav} = getTopPodcasts();

// const {Review} = require('../models/review_model'); 
// const {User} = require('../models/user_model'); 

async function test(client) {

  try {

    await client.connect();
    // await listDatabases(client);
    const database = client.db('CannedPods');
    const reviews = database.collection('review');

    const query = { id: '1' }

    const review = await reviews.findOne(query);

    console.log(review)

  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }

}

test(client).catch(console.error);

// async function test(client) {
// }

// test(client);

// app.get('/', function (request, response) {
//   // let podID = request.query.podcastID;
//   // model.Review.find({ podcast: podID }).then(function (reviewlist) {
//   //   response.send('review', {
//   //     review: reviewlist
//   //   })
//   // })

//     model.Review.find().then(function (reviewlist) {
//     response.send('review', {
//       review: reviewlist
//     })
//   })

// });

=======
>>>>>>> main
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


app.get('/home', function (req, res) {
  // getTopPodcasts().then(data => {
    console.log('here at /home')
    console.log(topReviewed)
    const reviews = reviewData.items;
    if (reviewData.items.length > 4) {
      reviews = reviewData.items.slice(0, 4)
    }
    res.send({ "podcasts": topRated, "user": userData, "review": reviews });
  // }).catch(e => {e})
});

app.use('/podcasts', podcastRoute);
app.use('/account', accountRoute);

// app.get('/home', function(req, res){
//   getTopPodcasts().then(data => {
//     res.send({"podcasts": data}); 
//   }); 
  
// }); 

app.get('/api', (req, res) => res.send(app.routes));


app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function () {
  console.log(`Listening on port ${app.get('port')}`);
});

