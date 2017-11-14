import React, { Component } from 'react';
var Rating = require('react-rating');

class Reviews extends Component {

  OpeningHours() {
    let date = new Date(),
        place = this.props.details,
        open = parseInt(place.opening_hours.periods[date.getDay()].open.time),
        close = parseInt(place.opening_hours.periods[date.getDay()].close.time);

    open > 1200 ? open -= 1200 : open;
    close > 1200 ? close -= 1200 : close;

    open = open.toString();
    close = close.toString();

    var end = open.length-2;
    open = [open.slice(0, end),":", open.slice(end)].join('');

    end = close.length-2;
    close = [close.slice(0, end),":", close.slice(end)].join('');

    const todaysHours = {
      open: open,
      close: close
    };
    return todaysHours;
  }
  
  render() {
  	const place = this.props.details,
          todaysHours = this.OpeningHours();

    return (
    	<div className="review">
    		<ul className="review_list">
    			<li>
      				<a href={'tel:'+place.formatted_phone_number}>
                {place.formatted_phone_number}
              </a>
    				                                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      				<a href={place.website}>
                Website
              </a>
    			</li>
          <li className="hours">
              Open: {todaysHours.open}
                                              &nbsp;&nbsp;&nbsp;&nbsp;
              Close:{todaysHours.close}
          </li>
    			<li>
    				  <b className="author">{place.reviews[0].author_name}</b>
    				                                    &nbsp;&nbsp;&nbsp;&nbsp;
    				  <Rating initialRate={place.rating} className="stars"
							     empty={<span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>}
      				      full={<span className="glyphicon glyphicon-star" aria-hidden="true"></span>} 
      			   />
    			</li>
    		</ul>
        <p>
            {place.reviews[0].text}
        </p>
    	</div>
    );
  }
}

export default Reviews;