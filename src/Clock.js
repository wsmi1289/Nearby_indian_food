import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);

    const currentTime = new Date();
    this.state = {
  		hours: currentTime.getHours(),
  		minutes: currentTime.getMinutes(),
  		seconds: currentTime.getSeconds(),
  		ampm: currentTime.getHours() >= 12 ? 'PM' : 'AM'
    };
    this.setTimer();
  }

  /******************
  *
  ***/
  setTimer() {
  	setTimeout(this.updateClock.bind(this), 1000);
  }

  /******************
  *
  ***/
  updateClock() {
		const currentTime = new Date();
    this.setState({
  		hours: currentTime.getHours(),
  		minutes: currentTime.getMinutes(),
  		seconds: currentTime.getSeconds(),
  		ampm: currentTime.getHours() >= 12 ? 'PM' : 'AM'
    }, this.setTimer);
  }

  render() {
  	const {hours, minutes, seconds, ampm} = this.state;
    return (
      <div className="clock">
 				{
 					hours == 0 ? 12 :
 						(hours > 12) ?
 							hours - 12 : hours
 				}:{
 					minutes > 9 ? minutes :`0${minutes}`
 				}:{
 					seconds > 9 ? seconds :`0${seconds}`
 				} {ampm}
      </div>
    );
  }
}

export default Clock;
