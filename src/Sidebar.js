/*global google*/
import React, { Component } from 'react';
import RestaurantRow from './RestaurantRow';
// import {Map, places} from './Map';
//console.log(places)
let place;
class Sidebar extends Component {
  // renderRestaurant(place, i) {
  //   return (
  //       <RestaurantRow data={place} key={i} />
  //     )
  // }
  render() {
    var places = this.props.places,
        map = this.props.map;
    // for (let i = 0; i < places.length; i++) {
    //   place = places[i];
    //   console.log(place);
      
    // }
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
