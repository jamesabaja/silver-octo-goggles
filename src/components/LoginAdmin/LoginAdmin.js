import React, {Component} from 'react';
import {Alert, Form, FormGroup, Label, Input, Button} from 'reactstrap';

class LoginAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({[name]: value});
  } 

  logIn = () => {
    if(this.state.username === 'admin' && this.state.password === 'jgabajacgkasilagkclee') {
      this.props.history.push('/admin');
    }
  }

  render() {
    return(
      <div className='container'>
        <a href='/'>Back to home</a>
        <br /><br />
        <h4>Admin Login</h4>
        {/* <Alert color='danger' isOpen={this.state.visible} toggle={this.onDismiss}>
          Invalid username and/or password.
        </Alert>
        <Alert color="light" isOpen={this.state.isLoading}>
          Verifying your login credentials, please wait...
        </Alert> */}
        <Form>
          <FormGroup>
            <Label for="accountName">Username</Label>
            <Input type="text" name="username" id="username" onChange={this.onChange} />
          </FormGroup>
          <FormGroup>
            <Label for="accountName">Password</Label>
            <Input type="password" name="password" id="password" onChange={this.onChange} />
          </FormGroup>
        </Form>
        <a href='/signup/driver'>Don't have an account? Signup here.</a>
        <br/>
        <Button color='info' onClick={this.logIn}>Submit</Button>
      </div>
    );
  }
}

export default LoginAdmin;