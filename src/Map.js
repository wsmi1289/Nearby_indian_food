/*global google*/
import React, { Component } from 'react';
import Sidebar from './Sidebar';

var map;
var infowindow;
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 14,
      places: null
    };
    const {lat, lng, center, placeResults} = this.props;
    console.log(placeResults);
    this.createMap = this.createMap.bind(this);
    this.createMarker = this.createMarker.bind(this);
  }

  /******************
  *
  ***/
  componentDidMount() {
     this.createMap();
  }
  componentWillReceiveProps(nextProps) {
    //const {lat, lng, center} = nextProps;
    if (nextProps.placeResults !== null) {
      //this.setState({places: nextProps.placeResults})
          console.log(nextProps.placeResults[1]);
      this.createMarker(nextProps.placeResults);
    }
    
  }

  /******************
  *
  ***/
  createMap() {
    const {center} = this.props;

    if (center !== null) {
      map = new google.maps.Map(this.refs.map, {
        center: center,
        zoom: this.state.zoom
      });
      this.props.onCreate(map);
    }
    // return map;
  }

  /******************
  *
  ***/
<<<<<<< HEAD
  placeService() {
    //infowindow = new google.maps.InfoWindow();
    const {center} = this.state;
    const service = new google.maps.places.PlacesService(map);
    service.textSearch({
      location: center,
      radius: 5000,
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
          // google.maps.event.addListener(marker, 'click', () => {
          //   infowindow.setContent(place.name);
          //   infowindow.open(map, this);
          // });

        };
=======
  createMarker(places) {
    //const places = this.state.places;
    //console.log(places);
    var finalPlaces = [];
    for (let i = 0; i < places.length; i++) {
      let place = places[i];
      if (map.getBounds().contains(place.geometry.location)) {
        console.log(place);
        finalPlaces.push(place);
        let marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
      } else {
        break;
>>>>>>> place_from_app
      }
    }
    this.setState({places: finalPlaces});
    //infowindow = new google.maps.InfoWindow(); 
  }

  /******************
  *
  ***/
  renderSide() {
    if (this.state.places !== null) {
     let restaurants=this.state.places;
     return (
      <Sidebar places={restaurants} map={map}/>
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