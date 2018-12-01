import React, {Component} from 'react';
import TabsPassenger from '../TabsPassenger/TabsPassenger';

class ViewTrips extends Component {
  render() {
    return(
      <div className='container'>
        <TabsPassenger active={'viewtrips'} />
        <h4>View Booked Trips</h4>
      </div>
    );
  }
}

export default ViewTrips;