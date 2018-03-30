import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, Glyphicon, InputGroup } from 'react-bootstrap';
import Profile from './components/Profile/Profile';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            query: '',
            artist: null
        }
    }
    search(){
        const BASE_URL = "https://api.spotify.com/v1/search?";
        const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const accessToken ='BQB3JyXFzehinCqnDrAuQ6ky6IxsVWH9n1gbIgROn6fLqhp6r7biHcfuRTmoKvyYZzr9VlwfcQV2K4mph0ZwqGAJtc7NzfmMgDRKtBQXB5L93BunxesXSyJM8N4coh3kZDhSSxNTSiiV8_y4RZVtDEc_OeYMyQ&refresh_token=AQDRLRatMfarjXvde5wUuVCzOin6gGuhZDZztXQh3oaKmd5TITsQqNuPCT9a4yRO2flOv7Yis0XkWh82xUv63wZ6ra-fxsS1sLy5xKi079IgHiW1ywT23wA0rbD-bKCMqkc';

        console.log(FETCH_URL);
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
          this.setState({artist})
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
            <div className="Gallery">Gallery</div>
          </div>;
    }
}

export default App;