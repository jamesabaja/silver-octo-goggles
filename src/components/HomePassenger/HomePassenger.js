import React, {Component} from 'react';
import {Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink} from 'reactstrap';
import TabsPassenger from '../TabsPassenger/TabsPassenger';

class HomePassenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripsDD: false
    }
  }

  toggleTripsDD = () => {
    this.setState({tripsDD: !this.state.tripsDD});
  }

  render() {
    return(
      <div className='container'>
        <TabsPassenger active={'dashboard'} />
        <h4>Welcome back, {localStorage.getItem('displayName')}.</h4>
      </div>
    );
  }
}

export default HomePassenger;