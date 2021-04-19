import React, {Component} from 'react'; 
import TopicHeader from '../../components/topicHeader/topicHeader'; 
import PodcastListitem from '../../components/podcastListItem/podcastListItem'; 
import Loading from '../../components/loading/loading';

import './search.css';

import {Form} from 'react-bulma-components'; 
const {Input} = Form; 

class Search extends Component{

  constructor(props){
    super(props); 
    let searchQuery = ''; 
    if (props.location){
      searchQuery= props.location.state.query;
    }
    this.state = {query: searchQuery}; 
  }

  componentDidMount(){
    if (this.state.query !== ''){
      fetch(`http://localhost:8080/podcasts/search/${this.state.query}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          data: data.shows
        }); 
      })
    }
  }

  displayResults(){
    if (this.state.data == null){
      return <Loading/>; 
    }
    return <div className="search-results">
      <TopicHeader text='Search Results: '/>
      {this.state.data.items.map((item) => <PodcastListitem podcastID={item.id}/>)}
    </div>
  }

  render(){
    return <div className='search-page'>
      <h1>Search for Podcasts</h1>
      <Input onChange={(e) => this.setState({query: e.target.value})} value={this.state.query}/>
      {this.displayResults()}
    </div>
  }
}

export default Search; 