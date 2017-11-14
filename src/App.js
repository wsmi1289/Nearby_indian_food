/*global google*/
import React, { Component } from 'react';
import Map from './Map';
import './App.css';

var map, center;
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
		this.Geocode = this.Geocode.bind(this);
		this.setGMap = this.setGMap.bind(this);
		this.placeService = this.placeService.bind(this);
	}

	/******************
  *
  ***/
  componentWillMount() {
    this.Geocode();
    // console.log(center);
    //               console.log(currentPosition);
  }
	/******************
  *
  ***/
  // componentDidUpdate() {
  // 	let lat = this.state.center.lat;
  //   console.log(lat);
    
  // }
  	/******************
  *
  ***/
  // renderMap() {
  // 	let lat = this.state.center.lat,
  // 			lng = this.state.center.lng;
  //   if (lat === null || lng === null ) {
  //   	return null
  //   } else {
  //   	return (
  //   		<Map center={center} onCreate={this.setGMap} placeResults={places}/>
  //   	)
  //   }
  // }

  /******************
  *	Finds user coords using html5 geolocation
  ***/
  Geocode() {
  	var center;
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
  	
  	// map=GMap;
  	if (GMap !== null) {
  		console.log(GMap)
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
    console.log(GMap);
    let service = new google.maps.places.PlacesService(GMap);
    service.textSearch({
      location: center,
      radius: 5000,
      query: ['indian restaurant']
          
    }, (results, status) => {
	      // this.setState({places: results});
	      if (status === google.maps.places.PlacesServiceStatus.OK) {
	      
	      	this.setState({ places: results });
				};
     	}
    );
  }

  render() {
  	const {center, places} = this.state;
  	const {lat, lng} = this.state.center;
  	if (places !== null) { console.log(places[1]);}
  	if(lat !== null && lng !== null && center !== null) {
  		var myMap = <Map center={center} onCreate={this.setGMap} placeResults={places}/>
  	} else {
  		var myMap = null;
  	}
    return (
      <div className="App">
      	{myMap}
      </div>
    );
  }
}

export default App;
