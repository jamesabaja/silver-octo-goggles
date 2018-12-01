import React, {Component} from 'react';
import TabsPassenger from '../TabsPassenger/TabsPassenger';
import axios from 'axios';
import {Table, Button} from 'reactstrap';

class ViewTrips extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      booking: []
    }
  }

  componentWillMount() {
    axios.get(`https://tickets-backend.herokuapp.com/booking/${localStorage.getItem('username')}`)
    .then(response => {
      response.data.map((item, i) => {
        axios.get(`https://tickets-backend.herokuapp.com/trips/${item.tripID}/`)
        .then(response => {
          this.setState({
            booking: [...this.state.booking, response.data]
          });
        })
      });
    })
  }  

  render() {
    return(
      <div className='container'>
        <TabsPassenger active={'viewtrips'} />
        <h4>View Booked Trips</h4>
        <Table>
        <thead>
            <tr>
              <th>Departure Date</th>
              <th>Departure Time</th>
              <th>Source Terminal</th>
              <th>Destination Terminal</th>
              <th>Seats Left</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.state.booking.length > 0 && this.state.booking.map((item, i) => {
            return(<tr>
              <td>{item.departureDate}</td>
              <td>{item.departureTime}</td>
              <td>{item.sourceTerminal}</td>
              <td>{item.destinationTerminal}</td>
              <td>{item.seatsLeft}</td>
              <td><Button color='success'>See Trip Details</Button></td>
            </tr>);
          })} 
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ViewTrips;