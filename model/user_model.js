// const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://sunny:NpeyKCnXQtW3S1wU@cluster0.1hv4s.mongodb.net/cannedpods?retryWrites=true&w=majority', {
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