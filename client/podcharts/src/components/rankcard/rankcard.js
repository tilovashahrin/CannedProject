import React from "react";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Media, Content, Heading, Image, Container } from 'react-bulma-components';
import "./rankcard.css"
// import {Card, Media, Content, Heading} from 'react-bulma-components'; 

function Rankcard(props) {
    // const { title, image, description, rating, creator } = props
    const { image, title, description, creator, rating, ranking } = props
    console.log(image)
    return (
        // <Container>

        <Card id="cardItem" className="columns">
            {/* <Card.Image src={image} size="2by3" className="column is-2"/> */}
            <Card.Content className="column is-1" id="rank">
                <div  id="rankBox" className="content container has-text-centered">
                    <h1>Rank #{ranking} </h1>
                </div>
            </Card.Content>
            <Card.Content className="column is-8">
                <Media>
                    <Media.Item renderAs="figure" position="left">
                        <Image src={image} size={64} />
                    </Media.Item>
                    <Media.Item>
                        <Heading size={4}>{title}</Heading>
                        <Heading subtitle size={6}>By {creator}</Heading>
                    </Media.Item>
                    <Media.Item position="right">
                        {/* <Image src={image} size={64} /> */}
                        <div className="content">
                            <h2>Rating {rating} / 10</h2>
                        </div>
                    </Media.Item>
                </Media>
                <Content className="content">
                    <p>Description: </p>
                    <p>

                        {description}
                    </p>
                </Content>
            </Card.Content>
        </Card>
        // </Container>

        // <div className="card">
        //     <div className="card-image">
        //         <figure className="image is-4by3">
        //             <img scr={image} height="100" width="300"></img>
        //         </figure>
        //     </div>
        //     <div className="card-content">

        //         <div className="media">
        //                 <div className="media-content">
        //                     <p className="title is-4">{title}</p>
        //                     <p className="subtitle is-6">sub title</p>
        //                 </div>
        //             </div>

        //             <div className="content">
        //                 This is a show case of Rankcard
        //                 {description}
        //             </div>
        //         </div>
        //     </div>
    );
}

export default Rankcard;