import React from 'react';
import { Link } from 'react-router';
import MapContainer from '../map/map_container';

class Splash extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="main splash">
        <h1 className=""></h1>
        <MapContainer />
      </div>
    );
  }
}

export default Splash;
