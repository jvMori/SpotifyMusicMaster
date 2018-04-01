import React from 'react';
import './Track.css';

let Track = (props) => {
 
    return <div onClick={props.clicked} className="Track">
        <img src={props.imgSrc} alt="Track" className="Track__photo" />
        <p className="Track__info">{props.title}</p>
      </div>;
  
}

export default Track;