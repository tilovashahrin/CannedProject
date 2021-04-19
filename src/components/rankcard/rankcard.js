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

    const displaystars = (rating) => {
        const whitestar = "./images/icons/star_rate_white_24dp.svg";
        const blackstar = "./images/icons/star_rate_black_24dp.svg";

        var stars = []
        for (let i = 1; i < 6; i++) {
            if (i < rating) {
                stars.push(true)
            } else {
                stars.push(false)
            }
        }

        return <div className="stars content">
            {stars.map((value, index) =>
                <img src={(value) ? blackstar : whitestar} />
            )}
        </div>
    }

    return (
        <Card id="cardItem" className="columns container ">

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
                        <div className="content">
                            <h2>Rating {rating} / 5</h2>
                            {displaystars(rating)}
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