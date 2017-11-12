import React, { Component } from 'react';
import RestaurantRow from './RestaurantRow';

class Sidebar extends Component {
  render() {
    var places = this.props.places,
        map = this.props.map;
    return (
      <div className="sidebar">
        <h1>Closest Indian Restaurants</h1>
        {places.map(function(place, i){
          if (i <= 3) {
            return <RestaurantRow data={JSON.stringify(place)} key={i} map={map}/>;
          }
        })}
        
      </div>
    );
  }
}

export default Sidebar;
