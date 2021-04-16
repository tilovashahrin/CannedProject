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
            // need to take a rank-sorted list of podcast 
            let rank = 0;
            return <div className="home-page section has-text-left p-0 m-0">
                <section className="hero" id="ranktitle">
                    <div className="hero-body">
                        <p className="title">
                            Rankings
                        </p>
                        <p className="subtitle">
                            Category: Comedy
                        </p>
                    </div>
                </section>
                <div className="container section p-0 m-0">
                    <ul>
                        {
                            this.state.data.map(function (value) {
                                console.log(value)
                                rank += 1;
                                return (<li key={value.uri}>
                                    <div class="section">
                                        {/* <Rankcard image={value.episodes.items[0]['images'][0]['url']} title={value.name} description={value.description} creator={value.publisher} rating={8} ranking={rank} /> */}
                                        <Rankcard value={value} rank={rank} />
                                    </div>
                                </li>
                                )
                            })
                        }
                    </ul>
                    {/* <Rankcard image={this.state.data.episodes.items[0]['images'][0]['url']} title={this.state.data.name} description={this.state.data.description} creator={this.state.data.publisher} rating={8} ranking={1} /> */}
                </div>
            </div>
        }
    }
}




export default Home;