import React, {Component} from 'react';
import TabsPassenger from '../TabsPassenger/TabsPassenger';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import axios from 'axios';

class PassengerSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: ''
    }
  }

  deactivateAccount = () => {
    axios.delete(`https://tickets-backend.herokuapp.com/passengers/${localStorage.getItem('username')}/`)
    .then(response => {
      localStorage.removeItem('username');
      localStorage.removeItem('displayName');
      this.props.history.push('/');
    });
  }

  onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({[name]: value});
  }

  updateDisplayName = () => {
    axios.put(`https://tickets-backend.herokuapp.com/passengers/${localStorage.getItem('username')}/`,{
      'userID': localStorage.getItem('username'),
      'displayName': this.state.displayName
    }).then(response => {
      localStorage.setItem('displayName', this.state.displayName);
      this.props.history.push('/passenger/dashboard');
    });
  }

  render() {
    return(
      <div className='container'>
        <TabsPassenger active={'settings'} />
        <h4>Account Settings</h4>
        <hr></hr>
        <h4>Deactivate Account</h4>
        <Button color='danger' outline onClick={this.deactivateAccount}>Click here to deactivate account</Button>
        <hr></hr>
        <h4>Update Display Name</h4>
        <h6>Current Display Name: {localStorage.getItem('displayName')} </h6>
        <Form>
          <FormGroup>
            <Label for="displayName">Enter new display name here</Label>
            <Input type="text" name="displayName" id="displayName" onChange={this.onChange} />
          </FormGroup>
          <Button color='warning' outline onClick={this.updateDisplayName}>Update Display Name</Button>
        </Form>
      </div>
    );
  }
}

export default PassengerSettings;