import React, {Component} from 'react';
import TabsPassenger from '../TabsPassenger/TabsPassenger';
import {Form, FormGroup, Label, Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Alert} from 'reactstrap';
import axios from 'axios';

class UpdateTripRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terminals: [],
      departureDropdown: false,
      destinationDropdown: false,
      selectedDeparture: '',
      selectedDestination: '',
      price: '',
      departureDate: '',
      departureTime: '',
      seatsLeft: '',
      rating: '',
      isSuccessful: false,
      tripID: ''
    };
  }

  componentWillMount() {
    axios.get(`https://tickets-backend.herokuapp.com/rating/${localStorage.getItem('username')}/${localStorage.getItem('tripID')}/`)
    .then(response => {
      let data = response.data;
      this.setState({tripID: data.tripID, rating: data.rating});
    });
    axios.get('https://tickets-backend.herokuapp.com/terminals/')
    .then(response => {
      this.setState({terminals: response.data});
    });
  }

  goBack = () => {
    this.props.history.push('/passenger/view/trips');
  }

  onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({[name]: value});
  }

  onDismiss = (name) => {
    this.setState({[name]: false});
  }

  updateTrip = () => {
    this.setState({isSuccessful: false});
    axios.put(`https://tickets-backend.herokuapp.com/rating/${localStorage.getItem('username')}/${localStorage.getItem('tripID')}/`, {
      'tripID': this.state.tripID,
      'userID': localStorage.getItem('username'),
      'rating': parseInt(this.state.rating)
    }).then(response => {
      this.setState({isSuccessful: true});
      localStorage.removeItem('tripID');
      this.props.history.push('/passenger/view/trips');
    });
  }

  render() {
    return(
      <div className='container'>
        <TabsPassenger active={'viewtrips'} />
        <Button color='info' outline onClick={this.goBack}>Go back to View Trips</Button>
        <br /> 
        <br />
        <h4>Update Trip Rating</h4>
        <Form>
          <FormGroup>
            <Label for="tripID">Trip ID</Label> <span style={{color: 'red'}}>*</span>
            <Input type="text" name="tripID" id="tripID" onChange={this.onChange} value={this.state.tripID}/>
          </FormGroup>
          <FormGroup>
            <Label for="rating">Rating</Label> <span style={{color: 'red'}}>*</span>
            <Input type="text" name="rating" id="rating" onChange={this.onChange} value={this.state.rating} />
          </FormGroup>
        </Form>
        <br /> 
        <Button color='success' onClick={this.updateTrip}>Update Trip</Button>
      </div>
    );
  }
}

export default UpdateTripRating;