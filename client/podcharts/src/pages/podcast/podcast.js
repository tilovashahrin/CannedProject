import React, {Component} from 'react'; 
import Loading from '../../components/loading/loading'; 
import BannerImage from '../../components/bannerImage/bannerImage'; 
import EpisodeTile from '../../components/episodeTile/episodeTile'; 
import TopicHeader from '../../components/topicHeader/topicHeader'; 
import ReviewCard from '../../components/reviewCard/reviewCard'; 
import ReviewField from '../../components/reviewField/reviewField'; 

import './podcast.css'; 

// temporary data 
import podcastData from './tempPodcastData.json';
import reviewData from './tempReviewData.json'; 
class Podcast extends Component{
  constructor(props){
    super(); 
    this.props = props; 
    this.state = {data: null}; 
  }

  componentDidMount(){
    if (this.props.location){
      //fetch podcast from props.location.state.podcastID
    }
    this.setState({
      data: podcastData, 
      reviews: reviewData 
    }); 
  }

  onCreateReview(data){
    console.log(data); 
  }

  render(){
    if (this.state.data == null){
      return <Loading/>
    }
    else{
      return <div className="podcast-page">
        <BannerImage image={this.state.data.episodes.items[0]['images'][0]['url']} title={this.state.data.name} description={this.state.data.description}/>
        <TopicHeader text="Latest Episodes"/>
        <div className="episodes">
          <ul>
            {
              this.state.data.episodes.items.map((value) => <li key={value.uri}>
                  <EpisodeTile episode={value}/>
                </li>)
            }
          </ul>
        </div>
        <div className="clear"></div>

        <TopicHeader text="Reviews"/>
        <div className="reviews">
          <ReviewField author="user" callback={(data) => this.onCreateReview(data)}/>
          <ul>
            {
              this.state.reviews.items.map((item) => 
                <li>
                  <ReviewCard review={item}/>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    }
  }
}

export default Podcast; 