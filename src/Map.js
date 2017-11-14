/*global google*/
import React, { Component } from 'react';
import Sidebar from './Sidebar';

var map;
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 14,
      places: null
    };
  }

  /******************
  *
  ***/
  componentDidMount() {
     this.createMap();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.placeResults !== null) {
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
  }

  /******************
  *
  ***/

  createMarker(places) {
    var finalPlaces = [];
    for (let i = 0; i < places.length; i++) {
      let place = places[i];
      if (map.getBounds().contains(place.geometry.location)) {
        finalPlaces.push(place);
        let marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
      } else {
        break;
      }
    }
    this.setState({places: finalPlaces});
  }

  /******************
  *
  ***/
  renderSide() {
    if (this.state.places !== null) {
     let restaurants=this.state.places;
     let center = this.props.center;
     return <Sidebar places={restaurants} map={map} center={center}/>;
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