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


let reviewSchema = new Schema({
    "RatingPercentage": [Number], 
    "items": [{
        "author": String, 
        "rating": Number, 
        "title": String, 
        "content": String, 
        "id": String,
    }]
}, {
    collection: 'reviews'
});

let podcastSchema = new Schema(
    {
        "available_markets" : [String],
        "description" : String,
        "episodes" : {
          "href" : String,
          "items" : [{
            "audio_preview_url" : String,
            "description" : String, 
            "duration_ms" : Number,
            "external_urls" : {
              "spotify" : String
            },
            "href" : String,
            "id" : String,
            "images" : [ {
              "height" : Number,
              "url" : String,
              "width" : Number
            }],
            "is_externally_hosted" : Boolean,
            "language" : String,
            "name" : String,
            "release_date" : Date,
            "release_date_precision" : String,
            "type" :String,
            "uri" :String
          }],
          "limit" : Number,
          "next" : String,
          "offset" : Number,
          "previous" : {type = String, default: null},
          "total" : Number
        },
        "explicit" : Boolean,
        "external_urls" : {
          "spotify" : String
        },
        "href" : String,
        "id" : String,
        "images" : [ {
          "height" : Number,
          "url" : String,
          "width" : Number
        }],
        "is_externally_hosted" :Boolean,
        "languages" : [String],
        "media_type" : String,
        "name" :String,
        "publisher" : String,
        "type" : String,
        "uri" : String
    }
    , {
    collection = 'podcasts'
});

module.exports.account = mongoose.model('account', accountsSchema);
module.exports.review = mongoose.model('review', reviewSchema); 
module.exports.podcast = mongoose.model('podcast', podcastSchema);