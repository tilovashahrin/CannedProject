
// export default (props) => <p>Hello World</p>

import React, { Component, useState } from 'react';
import { motion } from "framer-motion";
import Loading from '../../components/loading/loading';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Rankcard from '../../components/rankcard/rankcard';
import TopicHeader from '../../components/topicHeader/topicHeader';
import ImageCarousel from '../../components/imageCarousel/imageCarousel';
import './home.css';

class Home extends Component {
  constructor(props) {
    super();
    this.state = { data: null, category: 'Comedy' };
    // this.state = { category: 'Comedy'}
  }

  componentDidMount() {
    fetch(`http://localhost:8080/trending`)
    .then(response => response.json())
    .then((data)=>{
      this.setState({
        data: data,
      });
    }); 
  }

  render() {
    // const [category, setCategory] = useState('Comedy');
    
    const onClickItem = (c) => {
      // console.log(c)
      // setCategory(c)
      this.setState({
        category: c,
      });
    }


    if (this.state.data == null) {
      return <Loading />
    }
    else {
      // need to take a rank-sorted list of podcast 
      let rank = 0;
      return <div className="home-page has-text-left p-0 m-0">
        <ImageCarousel />


        <div>
        <TopicHeader text='Top Trending:' />
          <TopicHeader text='Your Recent Reviews: ' />
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
                    <Rankcard value={value} rank={rank} />
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

