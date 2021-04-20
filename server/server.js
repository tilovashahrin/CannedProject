const express = require('express'); 
const session = require('express-session'); 
const cors = require('cors'); 
const {v4: uuidv4} = require('uuid'); 

let podcastRoute = require('./podcast/podcastRouter'); 
let accountRoute = require('./account/accountRouter'); 

const { MongoClient } = require('mongodb');
const secrets = require('./secrets.json'); 
const uri = 'mongodb+srv://${secrets.mongodb.username}:${secrets.mongodb.password}@cluster0.1hv4s.mongodb.net/CannedPods?retryWrites=true&w=majority'
const client = new MongoClient(uri);



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
}); 

