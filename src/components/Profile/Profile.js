import React, { Component } from 'react';
import './Profile.css';
import Aux from './../../hoc/Aux';

class Profile extends Component {
    render(){
        let artist = {name: '', followers: {total: ''}, images: [{url: ''}], genres : []};
        artist = this.props.artist !== null ? this.props.artist : artist;
       
        return <div className="Profile">
            {this.props.artist !== null ? <Aux>
                <img alt="Profile" src={artist.images[0].url} className="Profile__photo" />
                <div className="Profile__info">
                  <div>{artist.name}</div>
                  <div>{artist.followers.total} followers</div>
                  <div>
                    {artist.genres.map((genre, key) => {
                      genre = genre !== artist.genres[artist.genres.length - 1] ? ` ${genre},` : ` ${genre}`;
                      return <span key={key}>{genre}</span>;
                    })}
                  </div>
                </div>
              </Aux> : <div />}
          </div>;
    }
}

export default Profile;