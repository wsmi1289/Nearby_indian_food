/*global google*/
import React, { Component } from 'react';
import Infowindow from './Infowindow';

var map;
let infowindow;
class Marker extends Component {
  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) || (this.props.position !== prevProps.position)) {
      this.renderMarker();
    }
  }
  // Geocode(map) {
  //   if (navigator.geolocation) {
  //     console.log("geo");
  //      navigator.geolocation.getCurrentPosition(function(position) {
  //       var pos = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };
  //       map.setCenter(pos);
  //       infowindow = new google.maps.InfoWindow();
  //       const service = new google.maps.places.PlacesService(map);
  //       service.textSearch({
  //         location: map.getCenter(),
  //         radius: 1000,
  //         query: ['indian restaurant']
  //         // type: ['restaurant']
          
  //       }, function(results, status) {
  //         if (status === google.maps.places.PlacesServiceStatus.OK) {
  //           for (let i = 0; i < results.length; i++) {
  //             let place = results[i];

  //             let marker = new google.maps.Marker({
  //               map: map,
  //               position: place.geometry.location
  //             });
  //             google.maps.event.addListener(marker, 'click', function() {
  //               infowindow.setContent(place.name);
  //               infowindow.open(map, this);
  //             });

  //           };
  //         }
  //       });
  //     }, function() {
  //       console.log("geo failed error");
  //       // browser supports Geolocation
  
  //     });
  //   } else {
  //     // Browser doesnt support geolocation
  //     console.log("no geo");
  //   }
  // }

  renderMarker() {
    let {
      map, google, position, mapCenter
    } = this.props;

    let pos = position || mapCenter;
    position = new google.maps.LatLng(pos.lat, pos.lng);
  }

  render() {
    <div className="marker">
      {this.props.position}
    </div>
  }
}
export default Marker;