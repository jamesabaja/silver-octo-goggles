import React, {Component} from 'react';
import TabsAdmin from '../TabsAdmin/TabsAdmin';

class AddTrip extends Component {
  render() {
    return(
      <div className='container'>
        <TabsAdmin active={'add'} />
        <h4>Add Trip</h4>
      </div>
    );
  }
}

export default AddTrip;