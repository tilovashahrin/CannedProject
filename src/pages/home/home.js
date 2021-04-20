
// export default (props) => <p>Hello World</p>

import React, { Component, useState } from 'react';
import { motion } from "framer-motion";
import Loading from '../../components/loading/loading';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-spacing'
import Rankcard from '../../components/rankcard/rankcard';
import TopicHeader from '../../components/topicHeader/topicHeader';
import ImageCarousel from '../../components/imageCarousel/imageCarousel';
import TopTrendingBlock from '../../components/topTrendingBlock/topTrendingBlock'
import ReviewCard from '../../components/reviewCard/reviewCard'
import TopTrendingTile from '../../components/topTrendingTile/topTrendingTile'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './home.css';

// const NotificationManager = window.ReactNotifications.NotificationManager;

class Home extends Component {
  constructor(props) {
    super();
    this.state = { data: null, category: 0, user: null, reviews: null };

    this.loadData = this.loadData.bind(this);
    this.addFavNotification = this.addFavNotification.bind(this);
  }

  loadData() {
    fetch(`http://localhost:8080/home`)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          data: [data.podcasts.topFav, data.podcasts.topRated, data.podcasts.topReviewed],
        });
      });

    fetch('http://localhost:8080/account/', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        this.setState({ user: data.data });
        console.log(data);
        // if (data.reqStatus){
        //   fetch(`http://localhost:8080/podcasts/latestUserReview`, {credentials: 'include'})
        //   .then(response => response.json())
        //   .then(review => {
        //     console.log(review); 
        //     this.setState({reviews: review}); 
        //   })
        // }
      })
  }

  componentDidMount() {
    this.loadData();
  }
  inFavList(podcastID) {
    if (this.state.user == null) return false;
    this.state.user.favPodList.forEach((pod) => {
      if (pod === podcastID) {
        return true
      }
    })
    return false
  }

  addFavNotification = (type) => {
    return () => {
      switch (type) {
        case 'already added':
          NotificationManager.info('This is already in your fav list!');
          break;
        case 'adding':
          NotificationManager.success('Added to your favourite list', 'Title here');
          break;
        case 'not loggedin':
          NotificationManager.warning('Please log in to add podcast', 'Close after 3000ms', 3000);
          break;
      }
    };
  };
  render() {
    var imageslist = []
    const images = [
      './images/99invs.png',
      './images/adnan_syed.jpg',
      './images/steve.jpg',
    ];
    if (this.state.data != null) {
      var allpods = this.state.data[0]
      imageslist = imageslist.concat(allpods.map((pod) => pod.images[0].url))
      imageslist = imageslist.concat(images)
      imageslist = imageslist.concat(allpods.map((pod) => pod.images[0].url))
      imageslist = imageslist.concat(images)
    }

    const toggleFav = (podcastID) => {
      if (user != null) {
        // this.addFavNotification('adding');
        fetch('http://localhost:8080/account/toggleFavourites', {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ podcastID: podcastID })
        })
          .then(response => response.json())
          .then(data => {
            this.loadData();
          })
        console.log(`${this.state.user.name} added ${podcastID} podcast to their favpodlist`)
      } else {
        // this.addFavNotification('not loggedin')
        console.log('please log in to do this!!')
      }
    }
    // const [category, setCategory] = useState('Comedy');

    const user = this.state.user;
    if (this.state.data == null) {
      return <Loading />
    }
    else {
      // need to take a rank-sorted list of podcast 
      let rank = 0;
      let favs = (this.state.user == null) ? [] : this.state.user.favPodList;
      return <div className="home-page has-text-left p-0 m-0">
        <ImageCarousel />

        <div className="columns ">
          <TopTrendingBlock images={imageslist} />
          <div className=" has-margin-top-10 hide">
            <TopicHeader text='Your Recent Review' />
            <section className="container">
              {(this.state.reviews) ? this.state.reviews.map((review) => <ReviewCard review={review}></ReviewCard>) : <div />}
            </section>
          </div>
        </div>

        {/* <Ranking category={'Comedy'} data={this.state.data}/> */}
        <section>
          <section className="hero is-small" id="ranktitle">
            <div className="hero-body">
              <p className="title">
                Rankings
                      </p>
              <p className="subtitle">
                Category: {this.state.category}
              </p>
            </div>
            <nav className="breadcrumb has-bullet-separator is-centered" aria-label="breadcrumbs">
              <ul>
                <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}><li><a href="#" onClick={() => this.setState({ category: 0 })} >Top Favourited</a></li></motion.div>
                <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}><li><a href="#" onClick={() => this.setState({ category: 1 })}>Top Rated</a></li></motion.div>
                <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}><li><a href="#" onClick={() => this.setState({ category: 2 })}>Top Reviewed</a></li></motion.div>

              </ul>
            </nav>
          </section>

          <section className="section">
            <ul>
              {
                this.state.data[this.state.category].map(function (value) {
                  rank += 1;
                  return (<li key={value.uri}>
                    <Rankcard value={value} rank={rank} fav={favs.includes(value.id)} callback={(podcastID) => { toggleFav(podcastID) }} />
                    <div className="m-1"></div>
                  </li>
                  )
                })
              }
            </ul>
          </section>
        </section>
      </div>
    }
  }
}


export default Home;

