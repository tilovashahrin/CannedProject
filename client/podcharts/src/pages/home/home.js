
// export default (props) => <p>Hello World</p>

import React, { Component } from 'react';
import { Spring, useSpring } from 'react-spring';
import Loading from '../../components/loading/loading';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Rankcard from '../../components/rankcard/rankcard';
import TopicHeader from '../../components/topicHeader/topicHeader';

import podcastData from './tempPodcastData.json';
import './home.css';
import ImageSlider from '../../components/imageSlider';

class Home extends Component {
    constructor(props) {
        super();
        this.state = { data: null, category: 'Comedy' };
    }

    componentDidMount() {
        // console.log(podcastData);
        this.setState({
            data: podcastData,
        });
    }

    render() {

        if (this.state.data == null) {
            return <Loading />
        }
        else {
            // need to take a rank-sorted list of podcast 
            let rank = 0;
            return <div className="home-page has-text-left p-0 m-0">
                        <TopicHeader text='Top Trending:' />
                         {/* <div className="container">
                        <imageSlider></imageSlider>
                        </div> */}
                         <TopicHeader text='Your Recent Reviews: ' />
                <section>

                    <section className="hero is-small" id="ranktitle">
                        <div className="hero-body">
                            <p className="title">Rankings</p>
                            <p className="subtitle">Category: {this.state.category}</p>
                        </div>

                        <nav className="breadcrumb has-bullet-separator is-centered" aria-label="breadcrumbs">
                            <ul >
                                <li><a href="#" onClick={() => this.setState({ category: 'Comedy' })} style={{ color: "white" }}>Comedy</a></li>
                                <li><a href="#" onClick={() => this.setState({ category: 'Sports' })} style={{ color: "white" }}>Sports</a></li>
                                <li><a href="#" onClick={() => this.setState({ category: 'News' })} style={{ color: "white" }}>News</a></li>
                                <li><a href="#" onClick={() => this.setState({ category: 'Show' })} style={{ color: "white" }}>Show</a></li>
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

