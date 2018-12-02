import React, {Component} from 'react';
import TabsAdmin from '../TabsAdmin/TabsAdmin';
import {Button} from 'reactstrap';

class HomeAdmin extends Component {
  constructor(props) {
    super(props);
  }

  logOut = () => {
    this.props.history.push('/')
  }

  render() {
    return(
      <div className='container'>
        <TabsAdmin active={'dashboard'}/>
        <h4>Welcome back, Admin.</h4>
        <Button color='warning' outline onClick={this.logOut}>Log out</Button>
      </div>
    );
  }
}

export default HomeAdmin;