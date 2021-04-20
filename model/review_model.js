const {MongoClient} = require('mongodb');

const uri = 'mongodb+srv://sunny:NpeyKCnXQtW3S1wU@cluster0.1hv4s.mongodb.net/cannedpods?retryWrites=true&w=majority'
const client = new MongoClient(uri);

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