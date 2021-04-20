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
    this.state = {data: null, episodes: null, reviews:null, isLoggedIn: false, fav: false}; 
    this.loadData = this.loadData.bind(this); 
  }
  

  loadData(){
    if (this.props.location){
      fetch(`http://localhost:8080/podcasts/${this.props.location.state.podcastID}`)
      .then(response => response.json())
      .then((data)=>{
        console.log(data); 
        this.setState({
          data: data, 
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
      });

      fetch('http://localhost:8080/account/', {credentials: 'include'})
        .then(response => response.json())
        .then(data => {
          this.setState({isLoggedIn: data.reqStatus}); 
        })
    }
  }

  componentDidMount(){
    this.loadData(); 
  }

  onCreateReview(data){
    console.log(JSON.stringify(data)); 
    fetch(`http://localhost:8080/podcasts/${this.props.location.state.podcastID}/addReview`, {
      credentials: 'include', 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then((data) => {
        this.loadData(); 
      }); 
  }
  
  toggleFav(podcastID){
    if (this.state.isLoggedIn) {
      // this.addFavNotification('adding');
      fetch('http://localhost:8080/account/toggleFavourites', {
        credentials: 'include', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST', 
        body: JSON.stringify({podcastID: podcastID})
      })
      .then(response => response.json())
      .then(data => {
        this.loadData(); 
      })
      console.log(`Added ${podcastID} podcast to their favpodlist`)
    } else {
      // this.addFavNotification('not loggedin')
      console.log('please log in to do this!!')
    }
  }

  render(){

    if (this.state.data == null || this.state.reviews == null || this.state.episodes == null){
      return <Loading/>
    }
    else{
      return <div className="podcast-page">
        <BannerImage image={this.state.data['images'][0]['url']} title={this.state.data.name} description={this.state.data.description}/>
        {/* <div id = "btn" className="heartbtn" onClick={() => this.toggleFav(this.state.data.id)}><img src="./images/icons/filled_heart.svg" />
          <div className="insidebtn">
              <span className="favorite">Favourite</span>
          </div>
        </div> */}
        <div>
          {/* {(fav) ? <button className="button is-priority" onClick= {() => callback(toggleFav())}>Add to Favourite</button> : <button className="button is-priority" onClick= {() => callback(toggleFav())}>remove from Favourite</button> } */}
          {(this.state.fav) ? <button className="button" onClick={() => this.toggleFav(this.state.podcastID)}><img src="./images/icons/filled_heart.svg" /><div>Remove from Fav</div></button> :
                <button className="inside-btn" onClick={() => this.toggleFav(this.state.podcastID)}><img src="./images/icons/empty_heart.svg" />Add to Fav</button>
              }
        </div>
        <TopicHeader text="Latest Episodes"/>
        <div className="episodes">
          <ul>
            {
              this.state.episodes.items.slice(0,4).map((value) => <li key={value.uri}>
                  <EpisodeTile episode={value}/>
                </li>)
            }
          </ul>
        </div>
        <div className="clear"></div>

        <TopicHeader text="Reviews"/>
        <div className="reviews">
          { (this.state.isLoggedIn) ? <ReviewField callback={(data) => this.onCreateReview(data)}/> : <div/>}
          <ul>
            {
              (this.state.reviews.length === 0) ? <div/> : this.state.reviews.map((item) => 
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