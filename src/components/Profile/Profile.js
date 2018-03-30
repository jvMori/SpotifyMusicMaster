import React, { Component } from 'react';
import styles from './Profile.css'

class Profile extends Component {
    render(){
        let artist = {name: '', followers: {total: ''}, images: [{url: ''}], genres : []};
        artist = this.props.artist !== null ? this.props.artist : artist;
       
        return <div className={styles.Profile}>
            <img alt="Profile" src={artist.images[0].url} className={styles.Profile__photo} />
            <div className={styles.Profile__info}>
              <div>{artist.name}</div>
              <div>{artist.followers.total} followers</div>
              <div>
                {artist.genres.map((genre, key) => {
                  genre = genre !== artist.genres[artist.genres.length - 1] ? ` ${genre},` : ` ${genre}`;
                  return <span key={key}>{genre}</span>;
                })}
              </div>
            </div>
          </div>
    }
}

export default Profile;