import React, {Component} from 'react';
import TabsAdmin from '../TabsAdmin/TabsAdmin';

class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }

  render() {
    return(
      <div className='container'>
        <TabsAdmin active={'dashboard'}/>
        <h4>Welcome back, Admin.</h4>
      </div>
    );
  }
}

export default HomeAdmin;