const mongoose = require('mongoose');
const secrets = require('../secrets.json'); 
const uri = `mongodb+srv://${secrets.mongodb.username}:${secrets.mongodb.password}@cluster0.1hv4s.mongodb.net/CannedPods?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.error('Unable to connect: ', error)
    } else {
        console.log('Connected Podcast to MongoDB')
    }
})


let Schema = mongoose.Schema; 

let podcastSchema = new Schema(
    {
      _id: String, 
      'reviewCount': Number,
      'rating': Number, 
      'favourites': Number
    }
    , {
    collection: 'podcast'
});

module.exports.Podcast = mongoose.model('podcast', podcastSchema);