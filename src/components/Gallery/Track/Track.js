import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    render(){
        return <div>
        <img src={this.props.imgSrc} alt="Track" className="Track__photo" />
        <p className="Track__info">{this.props.title}</p>
      </div>;
    }
}

export default Track;