/*global google*/
import React, { Component } from 'react';
import RestaurantRow from './RestaurantRow';
import Clock from './Clock';
// var place;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directionsVisible: false
    }
    this.handler = this.handler.bind(this);
    this.removeDirections = this.removeDirections.bind(this);
    
  };
  /******************
  *
  ***/
  componentDidMount() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.map = this.props.map;
  }
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
      origin: this.props.center,
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
    this.refs.title.style.display = "block";
  }

  render() {
    const {places, map} = this.props;
    var visible = this.state.directionsVisible;
        if (visible) {
          this.refs.title.style.display = "none";
        }
    return (
      <div id="sidebar">
        <Clock />
          <h1 ref="title">Closest Indian Restaurants</h1> .
        {
          visible
                  ? 
          <button onClick={this.removeDirections} >Back</button> 
                  :
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
