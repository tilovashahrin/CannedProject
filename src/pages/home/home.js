
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
import TopTrendingTile from '../../components/topTrendingTile/topTrendingTile'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './home.css';

// const NotificationManager = window.ReactNotifications.NotificationManager;

class Home extends Component {
  constructor(props) {
    super();
    this.state = { data: null, category: 'Comedy', user: null };
    // this.state = { category: 'Comedy'}
    this.loadData = this.loadData.bind(this); 
  }

  loadData(){
    fetch(`http://localhost:8080/home`)
    .then(response => response.json())
    .then((data)=>{
      console.log(data); 
      this.setState({
        data: data.podcasts,
      });
    }); 

    fetch('http://localhost:8080/account/', {credentials: 'include'})
    .then(response => response.json())
    .then(data => {
      this.setState({user: data.data}); 
    })
  }

  componentDidMount() {
    this.loadData(); 
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
    const images = [
      './images/99invs.png', 
      './images/steve.jpg', 
      './images/adnan_syed.jpg',
      './images/steve.jpg', 
      './images/99invs.png', 
      './images/adnan_syed.jpg',
      './images/steve.jpg', 
      './images/adnan_syed.jpg',
      './images/99invs.png',
    ]; 

    const inFavList = (podcastID) => {
      if (this.state.user == null) return false; 
      this.state.user.favPodList.forEach((pod) => {
        if (pod === podcastID) {
          return true
        }
      })
      return false
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
          body: JSON.stringify({podcastID: podcastID})
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
      return <div className="home-page has-text-left p-0 m-0">
        <ImageCarousel />


        <div className="columns ">
          <TopTrendingBlock images={images}/>
          <div className="columns is-half has-margin-top-20">
            <TopicHeader text='Your Recent Review' />
            <section className="container">
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
                <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}><li><a href="#" onClick={() => this.setState({ category: "Comedy" })} >Comedy</a></li></motion.div>
                <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}><li><a href="#" onClick={() => this.setState({ category: "Sports" })}>Sports</a></li></motion.div>
                <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}><li><a href="#" onClick={() => this.setState({ category: "News" })}>News</a></li></motion.div>
                <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}><li><a href="#" onClick={() => this.setState({ category: "Show" })}>Show</a></li></motion.div>
              </ul>
            </nav>
          </section>

          <section className="section">
            <ul>
              {
                this.state.data.map(function (value) {
                  rank += 1;
                  return (<li key={value.uri}>
                    <Rankcard value={value} rank={rank} fav={inFavList(value.id)} callback={(podcastID) => { toggleFav(podcastID) }} />
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

