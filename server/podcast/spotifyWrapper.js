const axios = require('axios'); 
const secrets = require('../secrets.json'); 
const { Key } = require('sshpk');

const spotify_id = secrets.spotify.id; 
const spotify_secret = secrets.spotify.secret; 


const wire = "https://api.spotify.com/v1/"
let token = ''; 

async function getAuthorization(){

  const res = await axios.post('https://accounts.spotify.com/api/token',
    'grant_type=client_credentials', {
    headers: {
        'Authorization': 'Basic ' + new Buffer(spotify_id + ':' + spotify_secret).toString('base64'),
    }
  }); 
  token = res.data.access_token; 
}


async function KeyWrapper(operation){
  let res = await operation(); 
  if (res){
    return res; 
  } 
  await getAuthorization(); 
  return await operation() 
}

async function getShow(id){
  let response = false; 
  await axios.get(wire + 'shows/?market=US&ids=' + id, {headers:{"Authorization": "Bearer " + token}})
  .then((res) => response = res, 
        (error) => {response = false;}); 
  return response; 
}

async function getEpisodes(id){
  let response = false; 
  await axios.get(wire + 'shows/' + id + '/episodes?market=US', {headers:{"Authorization": "Bearer " + token}})
  .then((res) => response = res, 
        (error) => {response = false;}); 
  return response; 
}

async function searchShow(query){
  const q = query.replace(/\s/g, '%20'); 
  let response = false; 
  console.log(q);
  await axios.get(`${wire}search?q=${q}&type=show&market=US`, {headers:{"Authorization": "Bearer " + token}})
  .then((res) => response = res, 
        (error) => {response = false;}); 
  return response; 
}

module.exports = {
  getShow: (id) => KeyWrapper(() => getShow(id)), 
  getEpisodes: (id) => KeyWrapper(() => getEpisodes(id)),
  searchShow: (query) => KeyWrapper(() => searchShow(query))

};