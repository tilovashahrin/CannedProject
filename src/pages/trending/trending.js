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
    this.state = { user: null, podcasts: [], loginStatus: false };
  }

  componentDidMount() {
    // console.log(podcastData)
    this.setState({
      user: userData,
      podcasts: podcastData,
      loginStatus: sessionStatus,
    })
  }

  render() {

    // filter out the fav podcasts
    const displayFavEpisodes = () => {
      var favpodlist = [];
      // var podcastlist = this.state.podcasts;
      // console.log(podcastlist)
      // this.state.user.favourites.map(function (favsID, index) {
      //   for (let i = 0; i < podcastlist.length; i++) {
      //     var pod = podcastlist[i];
      //     if (pod.id === favsID) {
      //       favpodlist.push(pod.episodes.items[0])
      //     }
      //   }
      // })
      favpodlist = this.state.podcasts;

      return favpodlist.map((pod, index) => <TrendingItem pod={pod} />)
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
            {displayFavEpisodes()}

            <section className="section">
            </section>

            <TopicHeader text="Canned Pods Recommandation" />
            {displayFavEpisodes()}
          </section>
        )
      }
    }
  }
}

export default Trending;