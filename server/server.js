const express = require('express');
let app = express();
// const review_model = require('./model/review_model.js') // import from local machine
// const user_model = require('./model/user_model.js') // import from local machine

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://sunny:NpeyKCnXQtW3S1wU@cluster0.1hv4s.mongodb.net/cannedpods?retryWrites=true&w=majority'
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
  databasesList = await client.db().admin().listDatabases();

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
