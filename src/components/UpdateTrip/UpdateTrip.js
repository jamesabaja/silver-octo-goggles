import React, {Component} from 'react';
import TabsAdmin from '../TabsAdmin/TabsAdmin';

class UpdateTrip extends Component {
  render() {
    return(
      <div className='container'>
        <TabsAdmin active={'update'} />
        <h4>Update Trip</h4>
      </div>
    );
  }
}

export default UpdateTrip;