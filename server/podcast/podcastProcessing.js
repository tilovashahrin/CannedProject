const {Review} = require('../models/review_model'); 

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
  return {
    rating: totalRatings/reviews.length, 
    distribution: distribution
  }; 
}

module.exports = {
  getPodcastReviewData: getPodcastReviewData
}