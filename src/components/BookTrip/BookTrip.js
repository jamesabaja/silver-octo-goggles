import React, {Component} from 'react';
import TabsPassenger from '../TabsPassenger/TabsPassenger';
import axios from 'axios';
import {Table, Button, Alert, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Label} from 'reactstrap';

class BookTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      booking: [],
      isSuccessful: false,
      alreadyExists: false,
      isLoading: false,
      bookingTrip: false,
      terminals: [],
      departureDropdown: false,
      selectedDeparture: '',
      destinationDropdown: false,
      selectedDestination: '',
      query: []
    };
  }

  componentWillMount() {
    this.setState({isLoading: true});
    axios.get('https://tickets-backend.herokuapp.com/trips/')
    .then(response => {
      this.setState({trips: response.data, isLoading: false});
    });
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
    });
    axios.get('https://tickets-backend.herokuapp.com/terminals/')
    .then(response => {
      this.setState({terminals: response.data});
    });
  }

  bookTrip = (tripID) => {
    this.setState({bookingTrip: true, isSuccessful: false, alreadyExists: false});
    axios.post('https://tickets-backend.herokuapp.com/booking/', {
      'userID': localStorage.getItem('username'),
      'tripID': tripID
    })
    .then(response => {
      if(response.status === 201) {
        axios.post('https://tickets-backend.herokuapp.com/rating/', {
          'userID': localStorage.getItem('username'),
          'tripID': tripID,
          'rating': 0
        });
        this.setState({isSuccessful: true, alreadyExists: false});
      }
      this.setState({bookingTrip: false});
    })
    .catch(error => {
      if(error.response.status === 400) {
        this.setState({isSuccessful: false, alreadyExists: true});
      }
      this.setState({bookingTrip: false});
    });
  }

  onDismiss = (alert) => {
    this.setState({[alert]: false});
  }

  toggleDeparture = () => {
    this.setState({departureDropdown: !this.state.departureDropdown})
  }

  toggleDestination = () => {
    this.setState({destinationDropdown: !this.state.destinationDropdown})
  }

  getDeparture = (name) => {
    this.setState({selectedDeparture: name});
    if(this.state.selectedDestination === '') {
      let newQuery = this.state.trips.filter((item, i) => {
        return item.sourceTerminal === name;
      });
      this.setState({query: newQuery});
    }else {
      let newQuery = this.state.trips.filter((item, i) => {
        return item.sourceTerminal === name && item.destinationTerminal === this.state.selectedDestination;
      });
      this.setState({query: newQuery});
    }
  }

  getDestination = (name) => {
    this.setState({selectedDestination: name});
    if(this.state.selectedDeparture === '') {
      let newQuery = this.state.trips.filter((item, i) => {
        return item.destinationTerminal === name;
      });
      this.setState({query: newQuery});
    }else {
      let newQuery = this.state.trips.filter((item, i) => {
        return item.destinationTerminal === name && item.sourceTerminal === this.state.selectedDeparture;
      });
      this.setState({query: newQuery});
    }
  }

  clearSelection = () => {
    this.setState({selectedDeparture: '', selectedDestination: '', query: []});
  }

  render() {
    return(
      <div className='container'>
        <TabsPassenger active={'book'} />
        <h4>Book a Trip</h4>
        <Alert color="success" isOpen={this.state.isSuccessful} toggle={() => this.onDismiss('isSuccessful')}>
          Successfully booked trip. Go to 'View Your Booked Trips' to view your other booked trips. 
        </Alert>
        <Alert color='danger' isOpen={this.state.alreadyExists} toggle={() => this.onDismiss('alreadyExists')}>
          You have already booked this trip. 
        </Alert>
        <Alert color="light" isOpen={this.state.isLoading}>
          Loading available trips, please wait ...
        </Alert>
        <Alert color="light" isOpen={this.state.bookingTrip}>
          Your request is being processed, please wait ...
        </Alert>
        <ButtonDropdown isOpen={this.state.departureDropdown} toggle={this.toggleDeparture}>
          <DropdownToggle caret color='info'>
            {this.state.selectedDeparture === '' ? 'Select Departure Terminal' : 'Departure Terminal: ' + this.state.selectedDeparture}
          </DropdownToggle>
          <DropdownMenu>
            {this.state.terminals.map((item, i) => {
              return(<DropdownItem onClick={() => this.getDeparture(item.terminalName)}>{item.terminalName}</DropdownItem>)
            })}
          </DropdownMenu>
        </ButtonDropdown>
        {' '}
        <ButtonDropdown  isOpen={this.state.destinationDropdown} toggle={this.toggleDestination}>
          <DropdownToggle caret color='info'>
            {this.state.selectedDestination === '' ? 'Select Destination Terminal' : 'Destination Terminal: ' + this.state.selectedDestination}
          </DropdownToggle>
          <DropdownMenu>
            {this.state.terminals.map((item, i) => {
              return(<DropdownItem onClick={() => this.getDestination(item.terminalName)}>{item.terminalName}</DropdownItem>)
            })}
          </DropdownMenu>
        </ButtonDropdown>
        {' '}
        <Button color='warning' onClick={this.clearSelection}>Clear Selection</Button>
        <br />
        <br />
        {this.state.query.length > 0 &&<Table>
          <thead>
            <tr>
              <th>Departure Date</th>
              <th>Departure Time</th>
              <th>Source Terminal</th>
              <th>Destination Terminal</th>
              <th>Seats Left</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.state.query.map((item, i) => {
            return(<tr>
              <td>{item.departureDate}</td>
              <td>{item.departureTime}</td>
              <td>{item.sourceTerminal}</td>
              <td>{item.destinationTerminal}</td>
              <td>{item.seatsLeft}</td>
              <td>{item.price} PHP</td>
              <td><Button color='success' onClick={() => this.bookTrip(item.tripID)}>Book Trip</Button></td>
            </tr>);
          })} 
          </tbody>
        </Table> }
      </div>
    );
  }
}

export default BookTrip;