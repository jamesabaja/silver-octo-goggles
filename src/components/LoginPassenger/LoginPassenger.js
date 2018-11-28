import React, {Component} from 'react';
import {Alert, Form, FormGroup, Label, Input, Button} from 'reactstrap';

class LoginPassenger extends Component {
  render() {
    return(
      <div className='container'>
        <a href='/'>Back to home</a>
        <br /><br />
        <h4>Passenger Login</h4>
        {/* <Alert color='danger' isOpen={this.state.visible} toggle={this.onDismiss}>
          Invalid username and/or password.
        </Alert>
        <Alert color="light" isOpen={this.state.isLoading}>
          Verifying your login credentials, please wait...
        </Alert> */}
        <Form>
          <FormGroup>
            <Label for="accountName">Username</Label>
            <Input type="text" name="text" id="username" onChange={this.onChange} />
          </FormGroup>
          <FormGroup>
            <Label for="accountName">Password</Label>
            <Input type="password" name="text" id="password" onChange={this.onChange} />
          </FormGroup>
        </Form>
        <a href='/signup/passenger'>Don't have an account? Signup here.</a>
        <br/>
        <Button color='info' onClick={this.signUp}>Submit</Button>
      </div>
    );
  }
}

export default LoginPassenger;