import React, {Component} from 'react'; 
import Loading from '../../components/loading/loading'; 
import BannerImage from '../../components/bannerImage/bannerImage'; 
import EpisodeTile from '../../components/episodeTile/episodeTile'; 
import TopicHeader from '../../components/topicHeader/topicHeader'; 

// temporary data 
import podcastData from './tempPodcastData.json';
class Podcast extends Component{
  constructor(props){
    super(); 
    this.props = props; 
    this.state = {data: null}; 
  }

  componentDidMount(){
    console.log(podcastData); 
    this.setState({
      data: podcastData
    }); 
  }

  render(){
    if (this.state.data == null){
      return <Loading/>
    }
    else{
      return <div className="podcast-page">
        <BannerImage image={this.state.data.episodes.items[0]['images'][0]['url']} title={this.state.data.name} description={this.state.data.description}/>
        <div className="episodes">
          <TopicHeader text="Latest Episodes"/>
          {
            this.state.data.episodes.items.map((value) => <EpisodeTile episode={value}/>)
          }
        </div>
      </div>
    }
  }
}

export default Podcast; 