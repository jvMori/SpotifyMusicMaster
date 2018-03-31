import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: "",
      audio: null,
      playing: false
    };
  }

  playAudio = previewUrl => {
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

  render() {
    return (
      <div
        onClick={() => this.playAudio(this.props.playAudio)}
        className="Track"
      >
        <img src={this.props.imgSrc} alt="Track" className="Track__photo" />
        <p className="Track__info">{this.props.title}</p>
      </div>
    );
  }
}

export default Track;