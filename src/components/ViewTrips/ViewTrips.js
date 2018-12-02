import React, {Component} from 'react';
import TabsPassenger from '../TabsPassenger/TabsPassenger';
import axios from 'axios';
import {Table, Button, Alert} from 'reactstrap';

class ViewTrips extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      booking: [],
      ratings: [],
      isCancelling: false
    }
  }

  componentWillMount() {
    axios.get(`https://tickets-backend.herokuapp.com/rating/${localStorage.getItem('username')}/`)
    .then(response => {
      response.data.map((item, i) => {
        axios.get(`https://tickets-backend.herokuapp.com/trips/${item.tripID}/`)
        .then(response => {
          this.setState({
            booking: [...this.state.booking, response.data],
            ratings: [...this.state.ratings, item.rating]
          });
        })
      });
    })
  }  

  cancelTrip = (tripID) => {
    this.setState({isCancelling: true});
    axios.delete(`https://tickets-backend.herokuapp.com/booking/${localStorage.getItem('username')}/${tripID}/`)
    .then(response => {
      this.setState({isCancelling: false});
      this.setState({booking: this.state.booking.filter((item, i) => {
        if(item.tripID === tripID) {
          return false;
        }
        return true;
      })});
    })
  } 

  updateRating = (tripID) => {
    localStorage.setItem('tripID', tripID);
    this.props.history.push('/passenger/update_rating');
  }

  render() {
    return(
      <div className='container'>
        <TabsPassenger active={'viewtrips'} />
        <h4>View Booked Trips</h4>
        <Alert color='danger' isOpen={this.state.isCancelling}>
          Cancelling trip, please wait ...
        </Alert>
        <Table>
        <thead>
            <tr>
              <th>Departure Date</th>
              <th>Departure Time</th>
              <th>Source Terminal</th>
              <th>Destination Terminal</th>
              <th>Rating</th>
              <th></th>
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
              <td>{this.state.ratings[i]}</td>
              <td><Button color='warning' onClick={() => this.updateRating(item.tripID)}>Update Rating</Button></td>
              <td><Button color='danger' onClick={() => this.cancelTrip(item.tripID)}>Cancel Trip</Button></td>
            </tr>);
          })} 
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ViewTrips;