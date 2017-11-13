/*global google*/
import React, { Component } from 'react';
import Sidebar from './Sidebar';

let map,
    infowindow;
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
    this.Geocode = this.Geocode.bind(this);
    this.createMap = this.createMap.bind(this);
    this.placeService = this.placeService.bind(this);
  }

  /******************
  *
  ***/
  componentDidMount() {
    this.Geocode();
  }

  /******************
  *
  ***/
  Geocode() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          zoom: 12
        });
        this.createMap();
        this.placeService();
      }, function() {
        console.log("geo failed error");
        // browser supports Geolocation
  
      });
    } else {
      // Browser doesnt support geolocation
      console.log("no geo");
    }
  }

  /******************
  *
  ***/
  createMap() {
    map = new google.maps.Map(this.refs.map, {
      center: this.state.center,
      zoom: this.state.zoom
    });
    infowindow = new google.maps.InfoWindow();
    // return map;
  }

  /******************
  *
  ***/
  placeService() {
    const service = new google.maps.places.PlacesService(map);
    service.textSearch({
      location: map.getCenter(),
      radius: 1000,
      query: ['indian restaurant']
          
    }, (results, status) => {
      this.setState({places: results});
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          let marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
          google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.setContent(place.name);
            this.infowindow.open(map, this);
          });

        };
      }
    });
  }

  /******************
  *
  ***/
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