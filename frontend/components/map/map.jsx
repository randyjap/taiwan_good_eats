import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import MarkerManager from '../../util/marker_manager';
import merge from 'lodash/merge';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const _getCoordsObj = latLng => ({
  lat: latLng.lat(),
  lng: latLng.lng()
});

let style = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

let _mapOptions = {
  center: {lat: 25.049766, lng: 121.5452643}, // San Francisco coords
  zoom: 13,
  scrollwheel: false,
  disableDefaultUI: true,
  styles: style,
  zoomControl: true
};

let restaurantDummies = [
  { id: 1, lat: 25.044866, lng: 121.5442743 },
  { id: 2, lat: 25.041146, lng: 121.5421783 },
  { id: 3, lat: 25.049526, lng: 121.5416753 },
  { id: 4, lat: 25.046316, lng: 121.5494793 },
  { id: 5, lat: 25.043696, lng: 121.5479713 }
];

class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(){
    this.setState({open: true});
  }

  handleClose(){
    this.setState({open: false});
  }

  componentDidMount(){
    const map = this.refs.map;
    this.map = new google.maps.Map(map, _mapOptions);
    this.MarkerManager = new MarkerManager(this.map, this._handleMarkerClick.bind(this));
    this._registerListeners();
    this.MarkerManager.updateMarkers(restaurantDummies);
  }

  componentDidUpdate(){
    this.MarkerManager.updateMarkers(restaurantDummies);
  }

  componentWillReceiveProps(nextProps){
    this.map.setCenter(nextProps.searchFilters.center);
  }

  _registerListeners(){
    google.maps.event.addListener(this.map, 'idle', () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west }
      };
    });

    google.maps.event.addListener(this.map, 'click', event => {
      const coords = _getCoordsObj(event.latLng);
      this._handleClick(coords);
    });
  }

  _handleMarkerClick(restaurant){
    this.props.router.replace(`restaurants/${restaurant.id}`);
  }

  _handleClick(coords){
    // this.props.router.push({
    //   pathname: "restaurants/new",
    //   query: coords
    // });
    console.log(coords);
  }

  render(){
    return (
      <div>
        <img style={{display:"block", margin:"auto"}} src="https://i0.wp.com/imgsynergy.com/product_creatives/7f7fc0078be5c9b3938431552bb79f16.gif"/>
        <div className="map" id="map-container" ref="map">Map</div>
      </div>
    );
  }
}

export default withRouter(Map);
