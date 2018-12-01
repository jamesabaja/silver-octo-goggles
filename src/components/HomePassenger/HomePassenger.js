import React, {Component} from 'react';
import {Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink, Button} from 'reactstrap';
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

  logOut = () => {
    localStorage.removeItem('displayName');
    localStorage.removeItem('username');
    this.props.history.push('/');
  }

  render() {
    return(
      <div className='container'>
        <TabsPassenger active={'dashboard'} />
        <h4>Welcome back, {localStorage.getItem('displayName')}.</h4>
        <Button onClick={this.logOut} color='warning' outline>Log out</Button>
      </div>
    );
  }
}

export default HomePassenger;