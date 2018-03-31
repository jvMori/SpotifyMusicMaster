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
        const accessToken ='BQCJP-BCPAW8JSOS8BZN6QP8dHCVQcE0bvc8QlR30xabqY1rcrDhbSuTuOCK4SJHCU9uSHv8sjB48SiNVdygwYcqPU7b-OuZuUoWfRTG0mJgNBnaMyFY-nCIZyw6-hVvb5kuwZwVF7hHtphWLmrNwXYNVPPKiQ&refresh_token=AQD0qfDBfhRYX7eoWSAx3c4bn1-zQZ3h1LGrWgHMWwZIua5d9IlrNgP4A6exD6JGA4em2GfRDk23BTzuij9bVb6PYMtaCuTXCU4tr_ikaQ5I-4oKFBlFawG4ktWpCufonVU';
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