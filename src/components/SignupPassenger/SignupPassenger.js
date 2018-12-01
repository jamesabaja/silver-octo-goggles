import React, {Component} from 'react';
import {Alert, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';

class SignupPassenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      displayName: '',
      alreadyExists: false,
      fillAll: false,
      isLoading: false,
      isSuccessful: false
    }
  }

  onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  onDismiss = (state) => {
    this.setState({[state]: false});
  }

  signUp = () => {
    if(this.state.username !== '' && this.state.displayName !== '') {
      this.setState({alreadyExists: false, fillAll: false, isLoading: true, isSuccessful: false});
      axios.post('https://tickets-backend.herokuapp.com/passengers/', {
        'userID': this.state.username,
        'displayName': this.state.displayName
      })
      .then(response => {
        if(response.status === 201) {
          this.setState({isSuccessful: true});
        }
        this.setState({isLoading: false});
        console.log(response);
        console.log(response.status);
      })
      .catch(error => {
        if(error.response.status === 400) {
          this.setState({alreadyExists: true});
        }
        this.setState({isLoading: false});
      });
    }else {
      this.setState({fillAll: true});
    }
  }

  render() {
    return(
      <div className='container'>
        <a href='/'>Back to home</a>
        <br /><br />
        <h4>Passenger Signup</h4>
        <Alert color='danger' isOpen={this.state.alreadyExists} toggle={() => this.onDismiss('alreadyExists')}>
          Username already exists. Please choose another username.
        </Alert>
        <Alert color='danger' isOpen={this.state.fillAll} toggle={() => this.onDismiss('fillAll')}>
          Please fill all required fields.
        </Alert>
        <Alert color="light" isOpen={this.state.isLoading}>
          Creating account, please wait ...
        </Alert>
        <Alert color="success" isOpen={this.state.isSuccessful}>
          Account successfully created. You may now login using your account <a href='/login/passenger'>here</a>.
        </Alert>
        <Form>
          <FormGroup>
            <Label for="accountName">Username</Label> <span style={{color: 'red'}}>*</span>
            <Input type="text" name="username" id="username" onChange={this.onChange} />
          </FormGroup>
          <FormGroup>
            <Label for="accountName">Display Name</Label> <span style={{color: 'red'}}>*</span>
            <Input type="text" name="displayName" id="displayName" onChange={this.onChange} />
          </FormGroup>
        </Form>
        <span style={{color: 'red'}}>* Required</span>
        <br/>
        <Button color='info' onClick={this.signUp}>Submit</Button>
      </div>
    );
  }
}

export default SignupPassenger;