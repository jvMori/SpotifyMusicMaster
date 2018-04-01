import React, { Component } from 'react';
import Track from './Track/Track';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
          playingUrl: "",
          audio: null,
          playing: false
        };
      }
    
      playAudio = (previewUrl) => {
        let audio = new Audio(previewUrl);
    
        if (!this.state.playing) {
          this.playTrack(audio, previewUrl);
        } else {
          if (this.state.playingUrl === previewUrl) {
            this.state.audio.pause();
            this.setState({ playing: false });
          } else {
            this.state.audio.pause();
            this.playTrack(audio, previewUrl);
          }
        }
      };

      playTrack(audio, previewUrl) {
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio
        });
      }
    render(){
        let tracks = [];
        tracks = this.props.tracks !== null ? this.props.tracks : tracks;
    
        return tracks.map((track, index) => {
            let trackSrc = track.album.images[0].url;
            let trackTitle = track.name;
            return <Track clicked = {() => this.playAudio(track.preview_url)} key={index} imgSrc={trackSrc} title={trackTitle} />;
        });
    }
};

export default Gallery;