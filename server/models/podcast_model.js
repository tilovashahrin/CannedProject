const mongoose = require('mongoose');
const secrets = require('../secrets.json'); 
const uri = `mongodb+srv: ${secrets.mongodb.username}:${secrets.mongodb.password}@cluster0.1hv4s.mongodb.net/CannedPods?retryWrites=true&w=majority`

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

let Schema = mongoose.Schema; 

let podcastSchema = new Schema(
    {
        "available_markets" : [String],
        "copyrights": Array, 
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
    collection = 'podcast'
});

module.exports.Podcast = mongoose.model('podcast', podcastSchema);