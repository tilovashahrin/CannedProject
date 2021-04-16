import React, {Component} from 'react'; 
import TopicHeader from '../../components/topicHeader/topicHeader'; 

class Home extends Component{
  render(){
    return <div>
      <TopicHeader text='Top Trending:'/>
      <TopicHeader text='Your Recent Reviews: '/>
      
    </div>
  }
}

export default Home; 