import React, {Component} from 'react';
import TabsAdmin from '../TabsAdmin/TabsAdmin';
import {Form, FormGroup, Label, Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Alert} from 'reactstrap';
import axios from 'axios';

class UpdateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terminals: [],
      departureDropdown: false,
      destinationDropdown: false,
      tripID: '',
      selectedDeparture: '',
      selectedDestination: '',
      price: '',
      departureDate: '',
      departureTime: '',
      seatsLeft: '',
      isSuccessful: false,
      isLoading: false,
      isUpdating: false
    };
  }

  componentWillMount() {
    this.setState({isLoading: true});
    axios.get(`https://tickets-backend.herokuapp.com/trips/${localStorage.getItem('tripID')}/`)
    .then(response => {
      let data = response.data;
      this.setState({tripID: data.tripID, selectedDeparture: data.sourceTerminal, selectedDestination: data.destinationTerminal, price: data.price, seatsLeft: data.seatsLeft, departureDate: data.departureDate, departureTime: data.departureTime});
    });
    axios.get('https://tickets-backend.herokuapp.com/terminals/')
    .then(response => {
      this.setState({terminals: response.data, isLoading: false});
    });
  }

  goBack = () => {
    this.props.history.push('/admin/view');
  }

  toggleDeparture = () => {
    this.setState({departureDropdown: !this.state.departureDropdown})
  }

  toggleDestination = () => {
    this.setState({destinationDropdown: !this.state.destinationDropdown})
  }

  getDeparture = (name) => {
    this.setState({selectedDeparture: name});
  }

  getDestination = (name) => {
    this.setState({selectedDestination: name});
  }

  clearSelection = () => {
    this.setState({selectedDeparture: '', selectedDestination: ''});
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
    this.setState({isSuccessful: false, isUpdating: true});
    axios.put(`https://tickets-backend.herokuapp.com/trips/${localStorage.getItem('tripID')}/`, {
      'tripID': this.state.tripID,
      'sourceTerminal': this.state.selectedDeparture,
      'destinationTerminal': this.state.selectedDestination,
      'price': parseInt(this.state.price, 10),
      'seatsLeft': parseInt(this.state.seatsLeft, 10),
      'departureDate': this.state.departureDate,
      'departureTime': this.state.departureTime
    }).then(response => {
      this.setState({isSuccessful: true, isUpdating: false});
      localStorage.removeItem('tripID');
      this.props.history.push('/admin/view');
    });
  }

  render() {
    return(
      <div className='container'>
        <TabsAdmin active={'delete'} />
        <Button color='info' outline onClick={this.goBack}>Go back to View Trips</Button>
        <br /> 
        <br />
        <h4>Update Trip</h4>
        <Alert color="light" isOpen={this.state.isLoading}>
          Loading trip details, please wait ...
        </Alert>
        <Alert color="light" isOpen={this.state.isUpdating}>
          Updating trip details to database, please wait ...
        </Alert>
        <Form>
          <FormGroup>
            <Label for="tripID">Trip ID</Label> <span style={{color: 'red'}}>*</span>
            <Input type="text" name="tripID" id="tripID" onChange={this.onChange} value={this.state.tripID}/>
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label> <span style={{color: 'red'}}>*</span>
            <Input type="text" name="price" id="price" onChange={this.onChange} value={this.state.price} />
          </FormGroup>
          <FormGroup>
            <Label for="departureDate">Departure Date (FORMAT: YYYY-MM-DD)</Label> <span style={{color: 'red'}}>*</span>
            <Input type="text" name="departureDate" id="departureDate" onChange={this.onChange} value={this.state.departureDate}/>
          </FormGroup>
          <FormGroup>
            <Label for="departureTime">Departure Time (24-HOUR FORMAT(00:00:00 to 23:59:59) : HH:MM:SS)</Label> <span style={{color: 'red'}}>*</span>
            <Input type="text" name="departureTime" id="departureTime" onChange={this.onChange} value={this.state.departureTime} />
          </FormGroup>
          <FormGroup>
            <Label for="seatsLeft">Seats Left</Label> <span style={{color: 'red'}}>*</span>
            <Input type="text" name="seatsLeft" id="seatsLeft" onChange={this.onChange} value={this.state.seatsLeft}/>
          </FormGroup>
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
        </Form>
        <br /> 
        <Button color='success' onClick={this.updateTrip}>Update Trip</Button>
      </div>
    );
  }
}

export default UpdateTrip;