import React, {Component} from 'react';
import TabsAdmin from '../TabsAdmin/TabsAdmin';
import axios from 'axios';
import {Table, Button} from 'reactstrap';

class DeleteTrip extends Component {
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

  deleteTrip = (tripID) => {
    axios.delete(`https://tickets-backend.herokuapp.com/trips/${tripID}/`)
    .then(response => {
      this.setState({trips: this.state.trips.filter((item, i) => {
        return item.tripID !== tripID;
      })})
    })
  }

  updateTrip = (tripID) => {
    localStorage.setItem('tripID', tripID);
    this.props.history.push('/admin/update');
  }

  render() {
    return(
      <div className='container'>
        <TabsAdmin active={'delete'} />
        <h4>View and Delete Trips</h4>
        <Table>
        <thead>
            <tr>
              <th>Departure Date</th>
              <th>Departure Time</th>
              <th>Source Terminal</th>
              <th>Destination Terminal</th>
              <th>Price</th>
              <th></th>
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
              <td>{item.price} PHP</td>
              <td><Button color='warning' onClick={() => this.updateTrip(item.tripID)}>Update Trip Details</Button></td>
              <td><Button color='danger' onClick={() => this.deleteTrip(item.tripID)}>Delete Trip</Button></td>
            </tr>);
          })} 
          </tbody>
        </Table>
      </div>
    );
  }
}

export default DeleteTrip;