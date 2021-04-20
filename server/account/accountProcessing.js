const {toPodcastObject} = require('../podcast/podcastProcessing');
const {Podcast} = require('../models/podcast_model'); 
const {User} = require('../models/user_model'); 

async function getFavPodList(userid){
  const favPodIdList = await User.find({id: userid}).favPodList; 
  // const favPodDataList = favPodIdList.map((podID) => await Podcast.findById(podID));

  return await toPodcastObject(favPodIdList); 
}

module.exports = {
  getFavPodList: getFavPodList
}