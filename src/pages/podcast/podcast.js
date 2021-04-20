import React, {Component} from 'react'; 
import Loading from '../../components/loading/loading'; 
import BannerImage from '../../components/bannerImage/bannerImage'; 
import EpisodeTile from '../../components/episodeTile/episodeTile'; 
import TopicHeader from '../../components/topicHeader/topicHeader'; 
import ReviewCard from '../../components/reviewCard/reviewCard'; 
import ReviewField from '../../components/reviewField/reviewField'; 

import './podcast.css'; 

class Podcast extends Component{
  constructor(props){
    super(props); 
    this.state = {data: null, episodes: null, reviews:null}; 
  }

  componentDidMount(){
    if (this.props.location){
      fetch(`http://localhost:8080/podcasts/${this.props.location.state.podcastID}`)
      .then(response => response.json())
      .then((data)=>{
        this.setState({
          data: data.shows[0], 
        }); 
      })
      fetch(`http://localhost:8080/podcasts/${this.props.location.state.podcastID}/episodes`)
      .then(response => response.json())
      .then((data)=>{
        this.setState({
          episodes: data, 
        }); 
      })
      fetch(`http://localhost:8080/podcasts/${this.props.location.state.podcastID}/reviews`)
      .then(response => response.json())
      .then((data)=>{
        console.log(data); 
        this.setState({
          reviews: data, 
        }); 
      })
    }
  }

  onCreateReview(data){
    console.log(data); 
  }  

  render(){
    const clicked = (c) => {
      console.log(c)
    // alert('Clicked!');
    }

    if (this.state.data == null || this.state.reviews == null || this.state.episodes == null){
      return <Loading/>
    }
    else{
      return <div className="podcast-page">
        <BannerImage image={this.state.data['images'][0]['url']} title={this.state.data.name} description={this.state.data.description}/>
        <div id = "btn" className="heartbtn" onClick={this.clicked}>
          <div className="insidebtn">
              <span className="favorite">Favourite</span>
          </div>
        </div>
        <TopicHeader text="Latest Episodes"/>
        <div className="episodes">
          <ul>
            {
              this.state.episodes.items.slice(0,4).map((value => <li key={value.uri}>
                  <EpisodeTile episode={value}/>
                </li>))
            }
          </ul>
        </div>
        <div className="clear"></div>

        <TopicHeader text="Reviews"/>
        <div className="reviews">
          <ReviewField author="user" callback={(data) => this.onCreateReview(data)}/>
          <ul>
            {
              (this.state.reviews.length === 0) ? <div/> : this.state.reviews.items.map((item) => 
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