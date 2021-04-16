import React, {Component} from 'react'; 
import TopicHeader from '../../components/topicHeader/topicHeader'; 
import ImageCarousel from '../../components/imageCarousel/imageCarousel'; 
class Home extends Component{
  componentDidMount(){

  }
  render(){
    return <div className="home-page">
      <ImageCarousel/>
      <TopicHeader text='Top Trending:'/>
      <TopicHeader text='Your Recent Reviews: '/>

    </div>
  }
}

export default Home; 