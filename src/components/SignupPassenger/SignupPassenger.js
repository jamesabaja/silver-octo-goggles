import React, {Component} from 'react';
import {Alert, Form, FormGroup, Label, Input, Button} from 'reactstrap';

class SignupPassenger extends Component {
  render() {
    return(
      <div className='container'>
        <a href='/'>Back to home</a>
        <br /><br />
        <h4>Passenger Signup</h4>
        <Form>
          <FormGroup>
            <Label for="accountName">Username</Label> <span style={{color: 'red'}}>*</span>
            <Input type="text" name="username" id="username" onChange={this.onChange} />
          </FormGroup>
          <FormGroup>
            <Label for="accountName">Display Name</Label> <span style={{color: 'red'}}>*</span>
            <Input type="text" name="displayName" id="displayName" onChange={this.onChange} />
          </FormGroup>
          <FormGroup>
            <Label for="accountName">Password</Label> <span style={{color: 'red'}}>*</span>
            <Input type="password" name="password" id="password" onChange={this.onChange} />
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