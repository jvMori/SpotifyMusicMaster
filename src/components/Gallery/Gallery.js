import React, { Component } from 'react';
import Track from './Track/Track';

class Gallery extends Component {
    render(){
        let tracks = [];
        tracks = this.props.tracks !== null ? this.props.tracks : tracks;
    
        return tracks.map((track, index) => {
            let trackSrc = track.album.images[0].url;
            let trackTitle = track.name;
            return <Track key={index} imgSrc={trackSrc} title={trackTitle} />;
        });
    }
};

export default Gallery;