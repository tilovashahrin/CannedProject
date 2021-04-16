import React from "react";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Media, Content, Heading, Image, Section, Container } from 'react-bulma-components';
import "./rankcard.css"
import { useHistory } from 'react-router-dom';

function Rankcard(props) {
    // const { title, image, description, rating, creator } = props
    const { value, rank } = props
    const history = useHistory();

    const image = value.episodes.items[0]['images'][0]['url'];
    const title = value.name;
    const description = value.description;
    const creator = value.publisher;
    const rating = 4.5; // value.rating
    const ranking = rank;
    const id = value.id;

    // console.log(image)

    const onClickItem = () => {
        history.push({ pathname: '/podcast', state: { podcastID: id } });
    }

    return (
        <Card id="cardItem" className="columns container ">
            {/* <Card.Image src={image} size="2by3" className="column is-2"/> */}
            <Card.Content className="column is-2 " id="rank">
                <div id="rankBox" className="content">
                    <h1>Rank #{ranking} </h1>
                </div>
            </Card.Content>
            <Card.Content className="column is-8" onClick={onClickItem}>
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
                            <h2>Rating {rating} / 5</h2>
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
    );
}

export default Rankcard;