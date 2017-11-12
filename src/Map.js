/*global google*/
import React, { Component } from 'react';
import Sidebar from './Sidebar';

var map;
let infowindow;
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: null,
        lng: null
      },
      zoom: 12,
      places: null,
    };
  }
  componentDidMount() {
    this.Geocode(this)
  }
  Geocode(self) {
    if (navigator.geolocation) {
      console.log("geo");
       navigator.geolocation.getCurrentPosition(function(position) {
        self.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          zoom: 12
        });
        map = new google.maps.Map(self.refs.map, {
          center: self.state.center,
          zoom: self.state.zoom
        });
        infowindow = new google.maps.InfoWindow();
        const service = new google.maps.places.PlacesService(map);
        service.textSearch({
          location: map.getCenter(),
          radius: 1000,
          query: ['indian restaurant']
          
        }, function(results, status) {
          self.setState({places: results});
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
  renderSide() {
    if (this.state.places !== null) {
     let places=this.state.places;
     return (
      <Sidebar places={places} map={map}/>
      )
    }
  }

  render() {
    
    return (
      <div className="window">
        {this.renderSide()}
        <div ref="map" id="map">
        </div>
      </div>
    );
  }
}

export default Map;