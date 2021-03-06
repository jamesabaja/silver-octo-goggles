import React from 'react';
import {Button} from 'reactstrap';

const Home = () => {
  return(
    <div className='container centered'>
      <h4>Bus Ticket Reservation System</h4>
      <Button outline color='primary' href='/login/passenger'>Passenger</Button>{' '}
      <Button outline color='warning' href='/admin/login'>Admin</Button>
    </div>
  );
};

export default Home;