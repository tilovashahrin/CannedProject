import React, {Component} from 'react'; 
import Loading from '../../components/loading/loading'; 
import TopicHeader from '../../components/topicHeader/topicHeader'; 
import PodcastListItem from '../../components/podcastListItem/podcastListItem'; 
import ActivityChart from '../../components/activityChart/activityChart'; 
import './account.css'; 



class Account extends Component{
  constructor(props){
    super(); 
    this.state = {data: null}; 
  }

  componentDidMount(){
    fetch('http://localhost:8080/account/')
    .then(response => response.json())
    .then((data) => {
      this.setState({
        data: data
      }); 
    })
  }

  render(){
    if (this.state.data == null){
      return <Loading/>; 
    }
    return <div className="account-page">
      <h2 className="account-welcome">Welcome </h2>
      <h2 className="account-back">back</h2>
      <h2 className="account-name">{this.state.data.name}</h2>
      <div className="bar"></div>
      <TopicHeader text="Favourite Podcasts"/>
      {this.state.data.favourites.map((id) => <PodcastListItem podcastID={id}/>)}
      <TopicHeader text="Ratings over the Year"/>
      <ActivityChart activity={this.state.data.YTD_reviews}/>
    </div>
  }
}

export default Account; 