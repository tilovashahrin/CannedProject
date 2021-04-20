const express = require('express'); 
const session = require('express-session'); 
const cors = require('cors'); 
const {v4: uuidv4} = require('uuid'); 

let podcastRoute = require('./podcast/podcastRouter'); 
let accountRoute = require('./account/accountRouter'); 

const { MongoClient } = require('mongodb');
const secrets = require('./secrets.json'); 
const uri = `mongodb+srv://${secrets.mongodb.username}:${secrets.mongodb.password}@cluster0.1hv4s.mongodb.net/cannedpods?retryWrites=true&w=majority`
const client = new MongoClient(uri);

// const {Review} = require('../models/review_model'); 
// const {User} = require('../models/user_model'); 

// const review_model = require('./model/review_model.js') // import from local machine
// const user_model = require('./model/user_model.js') // import from local machine


async function test(client) {
  
  try {

    await client.connect();
    // await listDatabases(client);
    const database = client.db('CannedPods');
    const reviews = database.collection('review');

    const query = {id: '1'}

    const review = await reviews.findOne(query);

    console.log(review)

  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }

}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases: ");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`))
}

// main().catch(console.error);
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

//temp data
const tempTrendingData = require('./tempData/tempTrending.json'); 
const userData = require('./tempData/tempAccountData.json');
const loggedin = true; // check if user is loggedin

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

app.get('/home', function(req, res){
  res.send({"podcasts": tempTrendingData, "user": userData}); 
}); 

app.get('/trending', function(req, res){
  res.send({"podcasts": tempTrendingData, "user": userData, "loggedin": loggedin}); 
}); 
app.get('/api', (req, res) => res.send(app.routes)); 


app.set('port', process.env.PORT || 8080); 
app.listen(app.get('port'), function(){
  console.log(`Listening on port ${app.get('port')}`); 
}); 

