const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/university', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(error) {
    if (error) {
        console.error('Unable to connect: ', error);
    } else {
        console.log('Connected to MongoDB');
    }
});

mongoose.set('useCreateIndex', true);

let Schema = mongoose.Schema;

let accountsSchema = new Schema({
    "name": String, 
    "id": String, 
    "email": String, 
    "YTD_reviews": String, 
    "favourites": [String], 
    "top_rated": [String]
}, {
    collection: 'accounts'
}); 

module.exports.account = mongoose.model('account', accountsSchema);
