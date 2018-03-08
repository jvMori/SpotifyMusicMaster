import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, Glyphicon, InputGroup } from 'react-bootstrap';

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
        const accessToken ='BQB51lWftRaLRrmY6mHnPiUTfAYM1KFtyBmdcijup3VmcGHvUld0KJHtFZs0D81sNkIaBo3rlRrlwl43BGjEmvCvg_fdv8WUmxJlxG2_1Do2GeokFFOn-ftBnlGSY77kjDXigi1gFTKFo4LRidqlUtlfJkjxXA&refresh_token=AQDqMX_iZ5BSCP-MWxtxUMLDO5Zb4flzjRNh6-gTlei6v18utbGOAWoiOUBGuTju9lBJohLZ1Y7zbM9IRdGX1M27u_wv3C7K7aI9UjgpwZX5es5lq6gAdp7P8Gb8tgeJQO4';
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
              this.setState({ artist });
        });
    }

    render(){
        let artist = { name: "", followers: { total: "" } };
        if (this.state.artist !== null) {
          artist = this.state.artist;
        }

        return (
            <div className="App">
                <div className="Title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl 
                            type="text"
                            placeholder="Search an Artist"
                            value={this.state.query} 
                            onChange={event => this.setState({query: event.target.value})}
                            onKeyPress={event => {
                                if (event.key === 'Enter'){
                                    this.search();
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={()=> this.search()}>
                            <Glyphicon glyph="search" />
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <div className="Profile">
                    <div>Artist Picture</div>
                    <div>Artist Name</div>
                    <div> {artist.name}   </div>
                    <div> {artist.followers.total} </div>
                </div>
                <div className="Gallery">
                    Gallery
                </div>
            </div> 
        )
    }
}

export default App;