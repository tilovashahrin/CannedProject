
// export default (props) => <p>Hello World</p>

import React, { Component, useState } from 'react';
import Loading from '../../components/loading/loading';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Rankcard from '../../components/rankcard/rankcard';
import TopicHeader from '../../components/topicHeader/topicHeader'; 

import podcastData from './tempPodcastData.json';
import './home.css';

class Home extends Component {
    constructor(props) {
        super();
        this.state = { data: null, category: 'Comedy'};
        // this.state = { category: 'Comedy'}
    }

    componentDidMount() {
        // console.log(podcastData);
        this.setState({
            data: podcastData, 
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

                <nav className="breadcrumb has-bullet-separator is-centered" aria-label="breadcrumbs">
                    <ul>
                        <li><a href="#" onClick={() => onClickItem("Comedy")}>Comedy</a></li>
                        <li><a href="#" onClick={() => onClickItem("Sports")}>Sports</a></li>
                        <li><a href="#" onClick={() => onClickItem("News")}>News</a></li>
                        <li><a href="#" onClick={() => onClickItem("Show")}>Show</a></li>
                    </ul>
                </nav>
          
                <div>
                    <TopicHeader text='Top Trending:'/>
                    <TopicHeader text='Your Recent Reviews: '/>
                </div>

                {/* <Ranking category={'Comedy'} data={this.state.data}/> */}
                <section>
                    <section className="hero" id="ranktitle">
                        <div className="hero-body">
                            <p className="title">
                                Rankings
                        </p>
                            <p className="subtitle">
                                Category: {this.state.category}
                        </p>
                        </div>
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

