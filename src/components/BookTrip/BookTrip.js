import React, {Component} from 'react';
import TabsPassenger from '../TabsPassenger/TabsPassenger';
import axios from 'axios';
import {Table, Button} from 'reactstrap';

class BookTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
  }

  componentWillMount() {
    axios.get('https://tickets-backend.herokuapp.com/trips/')
    .then(response => {
      this.setState({trips: response.data});
    });
  }

  render() {
    return(
      <div className='container'>
        <TabsPassenger active={'book'} />
        <h4>Book a Trip</h4>
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
          {this.state.trips.length > 0 && this.state.trips.map((item, i) => {
            return(<tr>
              <td>{item.departureDate}</td>
              <td>{item.departureTime}</td>
              <td>{item.sourceTerminal}</td>
              <td>{item.destinationTerminal}</td>
              <td>{item.seatsLeft}</td>
              <td><Button color='success'>Book Trip</Button></td>
            </tr>);
          })} 
          </tbody>
        </Table> 
        
      </div>
    );
  }
}

export default BookTrip;