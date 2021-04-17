const express = require('express');
let app = express();
const review_model = require('./model/review_model.js') // import from local machine
const user_model = require('./model/user_model.js') // import from local machine

app.get('/podcast', function (request, response) {
  let podID = request.query.podcastID;

  model.Review.find({ podcast: podID }).then(function (reviewlist) {
    response.send('review', {
      review: reviewlist
    })
  })
  
});
