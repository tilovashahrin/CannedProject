import React from "react";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Rankcard from '../../components/rankcard/rankcard';


function Ranking(props) {

    const {category, data} = props;
    let rank = 0

    // console.log(data)

    return (
        <section>
                    <section className="hero" id="ranktitle">
                        <div className="hero-body">
                            <p className="title">
                                Rankings
                        </p>
                            <p className="subtitle">
                                Category: {category}
                        </p>
                        </div>
                    </section>


                    <section className="section">
                        <ul>
                            {
                                data.map(function (value) {
                                    // console.log(value)
                                    rank += 1;
                                    return (<li key={value.uri}>
                                        {/* <Rankcard image={value.episodes.items[0]['images'][0]['url']} title={value.name} description={value.description} creator={value.publisher} rating={8} ranking={rank} /> */}
                                        <Rankcard value={value} rank={rank} />
                                        <div className="m-1"></div>
                                    </li>
                                    )
                                })
                            }
                        </ul>
                        {/* <Rankcard image={this.state.data.episodes.items[0]['images'][0]['url']} title={this.state.data.name} description={this.state.data.description} creator={this.state.data.publisher} rating={8} ranking={1} /> */}
                    </section>
                </section>
    )

}

export default Rankcard;