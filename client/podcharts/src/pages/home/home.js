// export default (props) => <p>Hello World</p>

import React, { Component } from 'react';
import Loading from '../../components/loading/loading';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Rankcard from '../../components/rankcard/rankcard';

import podcastData from './tempPodcastData.json';
import './home.css';

class Home extends Component {
    constructor(props) {
        super();
        this.state = { data: null };
    }

    componentDidMount() {
        console.log(podcastData);
        this.setState({
            data: podcastData,
        });
    }

    render() {
        if (this.state.data == null) {
            return <Loading />
        }
        else {
            return <div className="home-page section">
                <section className="hero">
                    <div className="hero-body">
                        <p className="title">
                            Rankings
                        </p>
                        <p className="subtitle">
                            Category: Comedy
                        </p>
                    </div>
                </section>
                <div className="container section">
                    <Rankcard image={this.state.data.episodes.items[0]['images'][0]['url']} title={this.state.data.name} description={this.state.data.description} creator={this.state.data.publisher} rating={8} ranking={1} />
                </div>
            </div>
        }
    }
}




export default Home;