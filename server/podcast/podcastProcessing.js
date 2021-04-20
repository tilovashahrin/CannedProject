const {Review} = require('../models/review_model'); 
const {Podcast} = require('../models/podcast_model'); 
const {getShow} = require('./spotifyWrapper'); 
async function getPodcastReviewData(podcastID){
  const reviews = await Review.find({podcast: podcastID}); 
  let distribution = [0, 0, 0, 0, 0]; 
  let totalRatings = 0; 
  if (reviews.length === 0){
    return {
      rating: 0, 
      distribution: distribution
    }; 
  }
  reviews.forEach((item) =>{
    distribution[item.rating]++; 
    totalRatings+= item.rating; 
  }); 
  const data =  {
    rating: totalRatings/reviews.length, 
    distribution: distribution
  }; 
  updatePodcastReview(podcastID, {rating: data.rating, totalRatings: reviews.length}); 
  return data; 
}

async function updatePodcastReview(podcastID, data){
  let podcast = await Podcast.findById(podcastID); 
  if (podcast){
    podcast.rating = data.rating; 
    podcast.reviewCount = data.totalRatings; 
    podcast.save(); 
  }
  else {
    const pod = new Podcast({
      _id: podcastID,
      rating: data.rating, 
      reviewCount: data.totalRatings, 
      favourites: 0
    }); 
    pod.save(); 
  }
}

async function updatePodcastFavourites(podcastID, favourites){
  let podcast = await Podcast.findById(podcastID); 
  if (podcast){
    podcast.favourites += favourites; 
    podcast.save(); 
  }
  else {
    const pod = new Podcast({
      _id: podcastID,
      rating: 0, 
      reviewCount: 0, 
      favourites: favourites
    }); 
    pod.save(); 
  }
}

async function toPodcastObject(podcasts){
  let values =[] ; 
  for ( let i = 0; i < podcasts.length; i++){
    const item = podcasts[i]; 
    let showData = await getShow(item.id);
    let reviewData = await getPodcastReviewData(item.id)
    values.push({...showData.data.shows[0], ...reviewData}); 
  } 
  return values; 
}

async function getTopPodcasts(){
  
  const mostReviewed = await Podcast.find().sort({reviewCount: -1}).limit(5); 
  const mostFavourited = await Podcast.find().sort({favourites: -1}).limit(5); 
  const topRated = await Podcast.find().sort({rating: -1}).limit(5); 
  return {
    topReviewed: await toPodcastObject(mostReviewed),
    topFav: await toPodcastObject(mostFavourited), 
    topRated: await toPodcastObject(topRated)
  }; 
}

module.exports = {
  getPodcastReviewData: getPodcastReviewData, 
  updatePodcastFavourites: updatePodcastFavourites, 
  getTopPodcasts: getTopPodcasts
}