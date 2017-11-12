/*global google*/
import React, { Component } from 'react';
import Map from './Map';
import './App.css';

let infowindow;
class App extends Component {
	// constructor(props) {

	// }
	// componentWillMount() {
	// 	console.log(Map);
	// 	this.Geocode(Map.props);
	// };

  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;
