import React, {Component} from 'react'; 
import Loading from '../../components/loading/loading'; 
import podcastData from './tempPodcastData.json';
class Podcast extends Component{
  constructor(props){
    super(); 
    this.props = props; 
  }

  componentDidMount(){
    fetch(`./tempPodcastData.json`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }}).then((data) => {
      this.data = data; 
      console.log(this.data); 
    }); 
  }

  render(){
    if (this.data == null){
      return <Loading/>
    }
    else{
      return <div>
        <p>
          {this.data}
        </p>
      </div>
    }
  }
}

export default Podcast; 