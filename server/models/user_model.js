

const mongoose = require('mongoose');
const secrets = require('../secrets.json'); 
const uri = `mongodb+srv://${secrets.mongodb.username}:${secrets.mongodb.password}@cluster0.1hv4s.mongodb.net/cannedpods?retryWrites=true&w=majority`

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
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
let userSchema = new Schema({
    "id": String,
    "name": String,
    "email": String,
    "password": String,
    "favPodList": [String]
}, {
    collection: 'user'
})

module.exports.User = mongoose.model('user', userSchema);