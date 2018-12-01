import React, {Component} from 'react';
import TabsPassenger from '../TabsPassenger/TabsPassenger';

class BookTrip extends Component {
  render() {
    return(
      <div className='container'>
        <TabsPassenger active={'book'} />
        <h4>Book a Trip</h4>
      </div>
    );
  }
}

export default BookTrip;