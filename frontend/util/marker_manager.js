export default class MarkerManager {
  constructor(map, handleClick){
    this.map = map;
    this.markers = [];
    this.handleClick = handleClick;
    this._createMarkerFromRestaurant = this._createMarkerFromRestaurant.bind(this);
    this._removeMarker = this._removeMarker.bind(this);
    this._markersToRemove = this._markersToRemove.bind(this);
    // this._selectRestaurant = this._selectRestaurant.bind(this);
    // this._unselectRestaurant = this._unselectRestaurant.bind(this);
    window.markers = this.markers;
  }

  updateMarkers(restaurants){
    this.restaurants = restaurants;
    this._restaurantsToAdd().forEach(this._createMarkerFromRestaurant);
    this._markersToRemove().forEach(this._removeMarker);
  }

  _restaurantsToAdd() {
    const currentRestaurants = this.markers.map( marker => marker.restaurantId );
    return this.restaurants.filter( restaurant => !currentRestaurants.includes(restaurant.id) );
  }

  _markersToRemove(){
    const RestaurantIds = this.restaurants.map( restaurant => restaurant.id );
    return this.markers.filter( marker => !RestaurantIds.includes(marker.restaurantId) );
  }

  _createMarkerFromRestaurant(restaurant) {
    const pos = new google.maps.LatLng(restaurant.lat, restaurant.lng);
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      restaurantId: restaurant.id,
      icon: 'http://res.cloudinary.com/dkympkwdz/image/upload/v1488570961/restaurant_marker_mrnomi.png'
    });
    this._addWindow(restaurant, marker);
    marker.addListener('click', () => this.handleClick(restaurant));
    this.markers.push(marker);
  }

  _removeMarker(marker) {
    const idx = this.markers.indexOf( marker );
    this.markers[idx].setMap(null);
    this.markers.splice(idx, 1);
  }

  // _selectRestaurant(id) {
  //   document.getElementById(`searchRestaurant-${id}`).className = "restaurant-selected";
  // }

  // _unselectRestaurant(id) {
  //   document.getElementById(`searchRestaurant-${id}`).className = "restaurant";
  // }

  _addWindow(restaurant, marker) {
    let content =
    '<div class="mapwindow-content">' +
      '<div class="window-title">' +
        `Restaurant ABC` +
      '</div>' +
      '<div class="mapwindow-text">' +
        `Rating: <b class="window-bold">5 STARS!</b></br>` +
        `<b class="window-bold">Tasty Dim Sum!</b></br>` +
        `<b class="window-bold">$$</b></br>` +
        `<b class="window-bold">123 Songshan Road</b></br>` +
      '</div>' +
    '</div>';

    const infoWindow = new google.maps.InfoWindow({
      content: content,
      disableAutoPan: true,
      maxWidth: 150
    });

    marker.addListener('mouseover', () => {
      infoWindow.open(this.map, marker);
      // this._selectRestaurant(restaurant.id);
    });

    marker.addListener('mouseout', () => {
      infoWindow.close(this.map, marker);
      // this._unselectRestaurant(restaurant.id);
    });
  }
}
