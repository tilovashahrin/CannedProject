  
const mongoose = require('mongoose');

const secrets = require('../secrets.json'); 
const uri = `mongodb+srv://${secrets.mongodb.username}:${secrets.mongodb.password}@cluster0.1hv4s.mongodb.net/CannedPods?retryWrites=true&w=majority`

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