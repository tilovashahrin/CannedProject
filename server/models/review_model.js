  
const mongoose = require('mongoose');

const secrets = require('../secrets.json'); 
<<<<<<< HEAD
const uri = `mongodb+srv://${secrets.mongodb.username}:${secrets.mongodb.password}@cluster0.1hv4s.mongodb.net/CannedPods?retryWrites=true&w=majority`
=======
const uri = `mongodb+srv://${secrets.mongodb.username}:${secrets.mongodb.password}@cluster0.1hv4s.mongodb.net/CannedPods?retryWrites=true&w=majority`;
>>>>>>> 21328343f33fbda7a8dedc5171cd5dca24d21e44

mongoose.Promise = global.Promise;

mongoose.connect(uri, function (error) {
    if (error) {
        console.error('Unable to connect: ', error)
    } else {
        console.log('Connected to MongoDB')
    }
})

mongoose.set('useCreateIndex', true)

let Schema = mongoose.Schema
let reviewSchema = new Schema({
    "id": String,
    "title": String,
    "content": String,
    "podcast": String,
    "timestamp": String, 
    "rating": Number,
    "userid": String
}, {
    collection: "review"
})

module.exports.Review = mongoose.model('review', reviewSchema);