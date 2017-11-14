/*global google*/
import React, { Component } from 'react';
import RestaurantRow from './RestaurantRow';
import Clock from './Clock';
var place;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directionsVisible: false
    }
    this.handler = this.handler.bind(this);
    this.removeDirections = this.removeDirections.bind(this);
    this.directionsService = new google.maps.DirectionsService(),
    this.map = this.props.map,
    this.directionsDisplay = new google.maps.DirectionsRenderer();
  };
  /******************
  *
  ***/
  // componentDidMount() {
    
  // }
  /******************
  *
  ***/
  handler(e) {
    this.setState({directionsVisible: !this.state.directionsVisible});
    let place = this.matchPlace(e);
    this.displayDirections(place);
  }

  /******************
  *
  ***/
  matchPlace(event) {
    const {places} = this.props, //all place data from textSearch
          placeName = event.target.textContent; //Event target obj from click
    let matchingPlace;
    places.map((place, i) => {
      if (place.name === placeName) {
        matchingPlace = place;
      }
    })
    return matchingPlace;
  }

  /******************
  *
  ***/
  displayDirections(place) {
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(document.getElementById('sidebar'));
    const end = place.formatted_address;
    this.directionsService.route({
      origin: this.map.getCenter(),
      destination: end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    })
  }

  removeDirections() {
    this.setState({directionsVisible: !this.state.directionsVisible})
    this.directionsDisplay.setMap(null);
    this.directionsDisplay.setPanel(document.getElementById('hidden'));
  }

  render() {
    var places = this.props.places,
        map = this.props.map;
    return (
      <div id="sidebar">
        <Clock />

        <h1>Closest Indian Restaurants</h1>
        {
          this.state.directionsVisible ? <button onClick={this.removeDirections} >Back</button> :
            places.map((place, i) => {
              if (i <= 3) {
                return <RestaurantRow data={JSON.stringify(place)} key={i} map={map} handler={this.handler} sendData={this.getData}/>;
              }
            })
        }
        
      </div>
    );
  }
}

export default Sidebar;
