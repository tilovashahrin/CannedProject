import React, {Component} from 'react'; 
import TopicHeader from '../../components/topicHeader/topicHeader'; 
import PodcastListitem from '../../components/podcastListItem/podcastListItem'; 
import Loading from '../../components/loading/loading'; 
//temp data
import tempData from './searchResults.json'; 

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
      
    }
    this.setState({
      data: tempData
    }); 
  }

  displayResults(){
    if (this.state.data == null){
      return <Loading/>; 
    }
    return <div className="search-results">
      <TopicHeader text='Search Results: '/>
      {this.state.data.podcasts.map((item) => <PodcastListitem podcastID={item}/>)}
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