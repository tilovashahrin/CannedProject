

const mongoose = require('mongoose');
const secrets = require('../secrets.json'); 
const uri = `mongodb+srv://${secrets.mongodb.username}:${secrets.mongodb.password}@cluster0.1hv4s.mongodb.net/CannedPods?retryWrites=true&w=majority`

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    dbName: 'CannedPods'
}, function (error) {
    if (error) {
        console.error('Unable to connect: ', error)
    } else {
        console.log('Connected User to MongoDB')
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