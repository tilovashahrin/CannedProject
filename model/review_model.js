const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/canned_pods_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
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
    "rating": Integer,
    "userid": String
}, {
    collection: "review"
})

module.exports.Review = mongoose.model('review', reviewSchema);