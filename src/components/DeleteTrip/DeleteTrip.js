import React, {Component} from 'react';
import TabsAdmin from '../TabsAdmin/TabsAdmin';

class DeleteTrip extends Component {
  render() {
    return(
      <div className='container'>
        <TabsAdmin active={'delete'} />
        <h4>Delete Trip</h4>
      </div>
    );
  }
}

export default DeleteTrip;