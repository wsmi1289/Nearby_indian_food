/*global google*/
import React, { Component } from 'react';
import Map from './Map';
import './App.css';

// var map, center;
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			center: {
				lat: null,
				lng: null
			},
			map: null,
			places: null
		}
		this.setGMap = this.setGMap.bind(this);
	}

	/******************
  *
  ***/
  componentWillMount() {
    this.Geocode();
  }

  /******************
  *	Finds user coords using html5 geolocation
  ***/
  Geocode() {
  	// var center;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
          	center: {
            	lat: position.coords.latitude,
            	lng: position.coords.longitude
          	}
          });
      }, function() {
        console.log("geo failed error");
      });
    } else {
      console.log("no geo");
    }
  }

	/******************
  * grabs map variable from Map component for use in other requests
  ***/
  setGMap(GMap) {
  	if (GMap !== null) {
    	this.setState({ map: GMap });
    	this.placeService(GMap);
    }
  }

	/******************
  *
  ***/
  placeService(GMap) {
    //infowindow = new google.maps.InfoWindow();
    const {center} = this.state;
    let service = new google.maps.places.PlacesService(GMap),
        request = {
            location: center,
            radius: 5000,
            query: ['indian restaurant']
        };
    service.textSearch(request, (results, status) => {
	      if (status === google.maps.places.PlacesServiceStatus.OK) {
	      	this.setState({ places: results });
				};
     	}
    );
  }

  render() {
  	const {center, places} = this.state;
  	const {lat, lng} = this.state.center;
  	if(lat !== null && lng !== null && center !== null) {
  		          var myMap = <Map center={center} onCreate={this.setGMap} placeResults={places}/>
  	} else {
  		          myMap = null;
  	}
    return (
      <div className="App">
      	{myMap}
      </div>
    );
  }
}

export default App;
