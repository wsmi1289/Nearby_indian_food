import React, { Component } from 'react';
var Rating = require('react-rating');

class Reviews extends Component {

  OpeningHours() {
    const date = new Date(),
          today = date.getDay(),
          hour = date.getHours(),
          place = this.props.details;
    let open = parseInt(place.opening_hours.periods[today].open.time),
        close = parseInt(place.opening_hours.periods[today].close.time),
        open_pm, close_pm;

        open > 1200 ? open_pm = open - 1200 : open_pm = open;
        close > 1200 ? close_pm = close - 1200 : close_pm = close;

    let openStr = open_pm.toString();
    let closeStr = close_pm.toString();
    var end = openStr.length-2;
    open_pm = [openStr.slice(0, end),":", openStr.slice(end)].join('');
    end = closeStr.length-2;
    close_pm = [closeStr.slice(0, end),":", closeStr.slice(end)].join('');

    const todaysHours = {
      open: open_pm,
      close: close_pm
    };
    return todaysHours;
  }
  render() {
  	const place = this.props.details,
          todaysHours = this.OpeningHours();

    console.log(place.opening_hours.open_now);
    return (
    	<div className="review">
    		<ul className="review_list">
    			<li>
    				<a href={'tel:'+place.formatted_phone_number}> {place.formatted_phone_number}</a>
    				<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    				<a href={place.website}>Website</a>
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

    			<p>{place.reviews[0].text}</p>
    		</ul>
    	</div>
    );
  }
}

export default Reviews;