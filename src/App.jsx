import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, Glyphicon, InputGroup } from 'react-bootstrap';
import Profile from './components/Profile/Profile';
import Gallery from './components/Gallery/Gallery';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }
    search(){
        const BASE_URL = "https://api.spotify.com/v1/search?";
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const accessToken ='BQBcnrJXuLk3x_j9K34K_pT9-7mgEuud6-n5qZhUDpOw2ZCjeTFw0EcmQ6ZCG5wyKdNNnLfM8YfCkHTGqygNguVOzKtbeaSIAWNd2s_EuWr9CV9dmIaQ4SC4TekbnBZVNXrr9s7ujhm8wQV2GbHE8D9s7rq99A&refresh_token=AQAiaPdV-28Eg4L2QKgSV7v9nevNPQduNZ2fQXmheuLTnJoz9tQwA1WpIT1ITtMY0fLFBfQNOxR0jYGRpLpwFIaW5nQQBIzoyFL-RG1BsBxEehgUq2ocSuPiiwmQNUKZV7Y';
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

        let myOptions = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
          };

      fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
          const artist = json.artists.items[0];
          this.setState({artist});

          FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=PL&`;

          fetch(FETCH_URL, myOptions)
          .then(response => response.json())
          .then(json => {
            console.log(json);
            const {tracks} = json;
            this.setState({tracks});
          });
      });
    }

    render(){
        return <div className="App">
            <div className="Title">Music Master</div>
            <FormGroup>
              <InputGroup>
                <FormControl type="text" placeholder="Search an Artist" value={this.state.query} onChange={event => this.setState(
                      { query: event.target.value }
                    )} onKeyPress={event => {
                    if (event.key === "Enter") {
                      this.search();
                    }
                  }} />
                <InputGroup.Addon onClick={() => this.search()}>
                  <Glyphicon glyph="search" />
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
            <Profile artist={this.state.artist} />
            <Gallery tracks={this.state.tracks}/>
          </div>;
    }
}

export default App;