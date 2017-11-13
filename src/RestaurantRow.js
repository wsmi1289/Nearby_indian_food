/*global google*/
import React, { Component } from 'react';
import Review from './Review';
var Rating = require('react-rating');

class RestaurantRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			place: null,
			visible: false,
		//	directionsVisible: false
		}
	};
	
  /******************
  *
  ***/
	componentDidMount() {
		var placeObj = JSON.parse(this.props.data);
		this.getPlaceDetails(placeObj.place_id);
	}

  /******************
  *
  ***/
	getPlaceDetails(id) {
		var request = {
  				placeId: id
				},
				service = new google.maps.places.PlacesService(this.props.map),
				self = this;
		service.getDetails(request, function(place_details, status) {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
    		self.setState({place: place_details})
  		}
		});
	};

  /******************
  *
  ***/
	renderReview() {
		if (this.state.place !== null) {
			let id = this.state.place.place_id;
			this.setState({visible: true})
			document.getElementById(id).remove();
		}
	}

  render() {
  	var place = JSON.parse(this.props.data),
  			fullAddress = place.formatted_address.toString(),
  			stop = fullAddress.search(/\d+(?!.*\d)/),
  			address = fullAddress.substr(0, (stop));
    return (
			<div className="RestaurantRow">
        <h3 className="rest_name" onClick ={this.props.handler} >
        	{place.name}
        </h3>
        <address>{address}</address>
				<Rating initialRate={place.rating} className="stars"
					empty={<span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>}
      		full={<span className="glyphicon glyphicon-star" aria-hidden="true"></span>} 
      	/>
      	<br/>
        <button onClick={()=>this.renderReview()} id={place.place_id}>More Info</button>
        {
        	this.state.visible ? <Review details={this.state.place} map={this.props.map} /> : null
        }
      </div>
    );
  }
}

export default RestaurantRow;