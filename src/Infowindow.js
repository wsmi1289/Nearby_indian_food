/*global google*/
import React, { Component } from 'react';


var map;
let infowindow;
class Infowindow extends Component {
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: {
        lat: 48.858608,
        lng: 2.294471
      },
      zoom: 16
    });
    
    this.Geocode(this.map);
    //SearchBox.bindTo('bounds', this.map);
  }
  componentDidUpdate() {
    
  }
  Geocode(map) {
    if (navigator.geolocation) {
      console.log("geo");
       navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        infowindow = new google.maps.InfoWindow();
        const service = new google.maps.places.PlacesService(map);
        service.textSearch({
          location: map.getCenter(),
          radius: 1000,
          query: ['indian restaurant']
          // type: ['restaurant']
          
        }, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
              let place = results[i];

              let marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
              });
              google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
              });

            };
          }
        });
      }, function() {
        console.log("geo failed error");
        // browser supports Geolocation
  
      });
    } else {
      // Browser doesnt support geolocation
      console.log("no geo");
    }
  }

  render() {
    return (
      <div ref="map" id="map">
      </div>
    );
  }
}
export default Infowindow;