import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-spacing'
import TopTrendingTile from '../../components/topTrendingTile/topTrendingTile';
import TopicHeader from '../../components/topicHeader/topicHeader';


function TopTrendingBlock(props) {
  const {images} = props;

  return (
  <div className="column is-half ">
    <TopicHeader text='Top Trending' />
    <section className="container has-margin-left-30 ">
      <div className="columns is-gapless is-multiline has-margin-bottom-0">
        <TopTrendingTile className="column is-half mb-0" startpage={0} length={'128'} images={images}/>
        <TopTrendingTile className="column is-half mb-0" startpage={1} length={'128'} images={images}/>
        <TopTrendingTile className="column is-half mb-0" startpage={2} length={'248'} images={images}/>
      </div>
      <div className="columns is-gapless is-multiline has-margin-bottom-0">
        <TopTrendingTile className="column is-half" startpage={3} length={'128'} images={images}/>
        <TopTrendingTile className="column is-half" startpage={4} length={'128'} images={images}/>
        <TopTrendingTile className="column is-half" startpage={5} length={'248'} images={images}/>
      </div>
      <div className="columns is-gapless is-multiline has-margin-bottom-0">
        <TopTrendingTile className="column is-half" startpage={6} length={'128'} images={images}/>
        <TopTrendingTile className="column is-half" startpage={7} length={'128'} images={images}/>
        <TopTrendingTile className="column is-half" startpage={8} length={'248'} images={images}/>
      </div>
    </section>
  </div>)
}

export default TopTrendingBlock; 
