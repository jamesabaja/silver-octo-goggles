import React, {Component} from 'react';
import {Alert, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';

class LoginPassenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      invalid: false,
      isLoading: false
    }
  }

  onDismiss = () => {
    this.setState({invalid: false});
  }

  logIn = () => {
    this.setState({isLoading: true, invalid: false});
    axios.get(`http://tickets-backend.herokuapp.com/passengers/${this.state.username}/`)
    .then(response => {
      if(response.status === 200) {
        localStorage.setItem('username', this.state.username);
        localStorage.setItem('displayName', response.data.displayName);
        this.props.history.push('/passenger/dashboard');
      }
      this.setState({isLoading: false});
    }).catch(error => {
      if(error.response.status === 404) {
        this.setState({invalid: true});
      }
      this.setState({isLoading: false});
    });
  }

  onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  render() {
    return(
      <div className='container'>
        <a href='/'>Back to home</a>
        <br /><br />
        <h4>Passenger Login</h4>
        <Alert color='danger' isOpen={this.state.invalid} toggle={this.onDismiss}>
          Invalid username.
        </Alert>
        <Alert color="light" isOpen={this.state.isLoading}>
          Verifying your login credentials, please wait...
        </Alert> 
        <Form>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" onChange={this.onChange} />
          </FormGroup>
        </Form>
        <a href='/signup/passenger'>Don't have an account? Signup here.</a>
        <br/>
        <Button color='info' onClick={this.logIn}>Submit</Button>
      </div>
    );
  }
}

export default LoginPassenger;