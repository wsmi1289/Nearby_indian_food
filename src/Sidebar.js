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
    this.displayDirections = this.displayDirections.bind(this);
    this.directionsService = new google.maps.DirectionsService(),
    this.map = this.props.map,
    this.directionsDisplay = new google.maps.DirectionsRenderer();
  };

  componentDidMount() {

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(document.getElementById('sidebar'));
  }

  handler(e) {
    // console.log(e.target);
    // console.log(e.detail);
    //e.preventDefault();
    this.setState({directionsVisible: !this.state.directionsVisible});
    let place = this.matchPlace(e);
    //this.directionsRequest(place);
    this.displayDirections(place);
  }
  // getData(val) {
  //   place = val;
  //   console.log(place);
  // }

  matchPlace(event) {
    const places = this.props.places,
          placeName = event.target.textContent;
    let matchingPlace;
    
    places.map((place, i) => {
      if (place.name === placeName) {
        console.log('placeName: '+placeName);
        console.log('place.name: '+place.name);
        matchingPlace = place;
      }
    })
    return matchingPlace;
  }

  // directionsRequest(place) {
  //   // const directionsService = new google.maps.DirectionsService(),
  //   //       map = this.props.map,
  //   //       directionsDisplay = new google.maps.DirectionsRenderer(),
  //   //       restaurants = document.querySelectorAll('.rest_name');
  //   //       // place = JSON.parse(this.props.data);
  //   //       console.log(place);
  //   // directionsDisplay.setMap(map);
  //   // directionsDisplay.setPanel(document.getElementById('sidebar'));
    
  //   for (var i = 0; i < restaurants.length; i++) {
  //     restaurants[i].addEventListener('click', this.displayDirections(directionsService, map, directionsDisplay))
  //   }

  // }

  displayDirections(place) {
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
  render() {
    var places = this.props.places,
        map = this.props.map;
    return (
      <div id="sidebar">
        <Clock />

        <h1>Closest Indian Restaurants</h1>
        {
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
