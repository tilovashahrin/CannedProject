const express = require('express');
let app = express();
// const review_model = require('./model/review_model.js') // import from local machine
// const user_model = require('./model/user_model.js') // import from local machine

const { MongoClient } = require('mongodb');
const secrets = require('secrets')

async function main() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    await listDatabases(client);
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

main().catch(console.error);

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
