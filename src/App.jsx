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
        const accessToken ='BQBusLesspRcPVWNt2Xyxaw-l4bbp0Yf4cLiNcKxR3Q8bW63ytm4gJCjVKs7RKHTHCRh_ddH1WDLhYNOoXnBP6vvbEcsASmdUiil07uS2JZEUoapuZbKBHaj04jfZHRRtgydigdevQIGjAhMuK7uVwjF8j2fvQ&refresh_token=AQCiWI2QU0HRdUGHkGQgdlRt6cO7JKnfu00ZWBN03Mnx4RdCbqAF8xxC_BmM4eKP2RYABGQiY1hYeWGDzBnX98f4BlhZdYaL24FYFcz_mbg3vEqF8WqkAuc6D5odKTaZvVg';
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