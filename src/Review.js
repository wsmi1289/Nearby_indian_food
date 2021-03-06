/*global google*/
import React, { Component } from 'react';
import Map from './Map';
var Rating = require('react-rating');
	var place;

class Reviews extends Component {

  render() {
  	var place = this.props.details;
    return (
    	<div className="review">
    		<ul className="review_list">
    			<li>
    				<a href={'tel:'+place.formatted_phone_number}> {place.formatted_phone_number}</a>
    				<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    				<a href={place.website}>Website</a>
    			</li>
    			<li>
    				<b className="author">{place.reviews[0].author_name}</b>
    				&nbsp;&nbsp;&nbsp;&nbsp;
    				<Rating initialRate={place.rating} className="stars"
							empty={<span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>}
      				full={<span className="glyphicon glyphicon-star" aria-hidden="true"></span>} 
      			/>
    			</li>

    			<p>{place.reviews[0].text}</p>
			{/* 
					<li>{place.reviews.rating}</li>
    			<li>{place..reviews.text}</li>
    			<li>{place.}</li>
    			<li>{place.}</li>
			*/}
    		</ul>
    	</div>
    );
  }
}

export default Reviews;

	// <button className="Reviews" onClick={()=>this.props.onClick()}>
				
 //      </button>