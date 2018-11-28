import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import LoginDriver from './components/LoginDriver/LoginDriver';
import LoginPassenger from './components/LoginPassenger/LoginPassenger';
import SignupDriver from './components/SignupDriver/SignupDriver';
import SignupPassenger from './components/SignupPassenger/SignupPassenger';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login/driver' component={LoginDriver}/>
          <Route exact path='/login/passenger' component={LoginPassenger} />
          <Route exact path='/signup/driver' component={SignupDriver} />
          <Route exact path='/signup/passenger' component={SignupPassenger} />
        </Switch>
      </div>
    );
  }
}

export default App;
