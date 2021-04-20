const {Review} = require('../models/review_model'); 
const {Podcast} = require('../models/podcast_model'); 
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
  updatePodcastReview(podcastID, data); 
  return data; 
}

async function updatePodcastReview(podcastID, data){
  const podcasts = await Podcast.find({podcastID: podcastID}); 
  if (podcasts.length > 0){
    let podcast = podcasts[0]; 
    podcast.rating = data.rating; 
    podcast.reviewCount = data.totalRatings; 
    podcast.save(); 
  }
  else {
    const pod = new Podcast({
      rating: data.rating, 
      reviewCount: data.totalRatings, 
      favourites: 0
    }); 
    pod.save(); 
  }
}

async function updatePodcastFavourites(podcastID, favourites){
  const podcasts = await Podcast.find({podcastID: podcastID}); 
  if (podcasts.length > 0){
    let podcast = podcasts[0]; 
    podcast.favourites += favourites; 
    podcast.save(); 
  }
  else {
    const pod = new Podcast({
      rating: 0, 
      reviewCount: [0,0,0,0,0], 
      favourites: favourites
    }); 
    pod.save(); 
  }
}

module.exports = {
  getPodcastReviewData: getPodcastReviewData, 
  updatePodcastFavourites: updatePodcastFavourites
}