import 'react-bulma-components/dist/react-bulma-components.min.css';
import React, {Component} from 'react';
import userData from './tempAccountData.json'
import TopicHeader from '../../components/topicHeader/topicHeader';
import Loading from '../../components/loading/loading';

const sessionStatus = false;

class Trending extends Component {
  constructor(props){
    super();
    this.state = {user: null, loginStatus: false};
  }

  componentDidMount() {
    this.setState({
      user: userData, 
      loginStatus: sessionStatus, 
    })
  }

  render() {
    if (!this.state.loginStatus) {
      return <TopicHeader text="Please log in to your accout to catch up on your favourite podcasts!!" />
    } 
    else {
      if (this.state.user == null) {
        return <Loading/>
      } else {
        return <Loading/>
      }
      
    }
  }
}

export default Trending;