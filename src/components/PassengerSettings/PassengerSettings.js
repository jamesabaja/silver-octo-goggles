import React, {Component} from 'react';
import TabsPassenger from '../TabsPassenger/TabsPassenger';

class PassengerSettings extends Component {
  render() {
    return(
      <div className='container'>
        <TabsPassenger active={'settings'} />
        <h4>Account Settings</h4>
      </div>
    );
  }
}

export default PassengerSettings;