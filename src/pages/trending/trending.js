import 'react-bulma-components/dist/react-bulma-components.min.css';
import React, { Component } from 'react';
import TopicHeader from '../../components/topicHeader/topicHeader';
import Loading from '../../components/loading/loading';

import userData from './tempAccountData.json'
import podcastData from './tempPodcastData.json';
import EpisodeTile from '../../components/episodeTile/episodeTile';
import TrendingItem from '../../components/trendingItem/trendingItem'

const sessionStatus = true;

class Trending extends Component {
  constructor(props) {
    super();
    this.state = { user: null, favouritePodList: [], trendingPodList: [], loginStatus: false };
    this.loadTrendingData = this.loadTrendingData.bind(this); 
  }


  loadTrendingData(){
    fetch('http://localhost:8080/trending/')
    .then(response => response.json())
    .then((data) => {
      console.log(data.loggedin)
      this.setState({
        user: data.user, 
        favouritePodList: data.favouritePodList,
        trendingPodList: data.trendingPodList,
        loginStatus: data.loginStatus
      }); 
    })
  }
  componentDidMount() {
    // console.log(podcastData)
    this.loadTrendingData(); 
  }

  render() {

    // filter out the fav podcasts

    const inFavList = (podcastID) => {
      this.state.user.favourites.forEach((pod) => {
        if (pod === podcastID) {
          return true
        }
      })
      return false
    }

    const toggleFav = (podcastID) => {
      if (this.state.user != null) {
        // this.addFavNotification('adding')
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
          this.loadTrendingData(); 
        })
        console.log(`${this.state.user.name} added ${podcastID} podcast to their favpodlist`)
      } else {
        // this.addFavNotification('not loggedin')
        console.log('please log in to do this!!')
      }
    }

    if (!this.state.loginStatus) {
      return (
        <section className="section">
          <TopicHeader text="Please log in to your accout to catch up on your favourite podcasts!!" />
        </section>)
    }
    else {
      if (this.state.user == null) {
        return <Loading />
      } else {
        return (
          <section className="section">
            <TopicHeader text="Latest episodes from your favourite pods" />
            {this.state.favouritePodList.map((pod, index) => 
            <TrendingItem pod={pod} fav={inFavList(pod.id)} callback={(podcastID) => toggleFav(podcastID)} />)}

            <section className="section">
            </section>

            <TopicHeader text="Canned Pods Recommandation" />
            {this.state.trendingPodList.map((pod, index) => 
            <TrendingItem pod={pod} fav={inFavList(pod.id)} callback={(podcastID) => toggleFav(podcastID)} />)}
          </section>
        )
      }
    }
  }
}

export default Trending;