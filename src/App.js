import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import LoginDriver from './components/LoginDriver/LoginDriver';
import LoginPassenger from './components/LoginPassenger/LoginPassenger';
import SignupDriver from './components/SignupDriver/SignupDriver';
import SignupPassenger from './components/SignupPassenger/SignupPassenger';
import LoginAdmin from './components/LoginAdmin/LoginAdmin';
import HomeAdmin from './components/HomeAdmin/HomeAdmin';
import HomePassenger from './components/HomePassenger/HomePassenger';
import AddTrip from './components/AddTrip/AddTrip';
import DeleteTrip from './components/DeleteTrip/DeleteTrip';
import UpdateTrip from './components/UpdateTrip/UpdateTrip';
import BookTrip from './components/BookTrip/BookTrip';
import ViewTrips from './components/ViewTrips/ViewTrips';
import PassengerSettings from './components/PassengerSettings/PassengerSettings';
import UpdateTripRating from './components/UpdateTripRating/UpdateTripRating';

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
          <Route exact path='/admin/login' component={LoginAdmin} />
          <Route exact path='/admin' component={HomeAdmin} />
          <Route exact path='/passenger/dashboard' component={HomePassenger} /> 
          <Route exact path='/admin/add' component={AddTrip} />
          <Route exact path='/admin/view' component={DeleteTrip} />
          <Route exact path='/admin/update' component={UpdateTrip} />
          <Route exact path='/passenger/book/trip' component={BookTrip} />
          <Route exact path='/passenger/view/trips' component={ViewTrips} />
          <Route exact path='/passenger/settings' component={PassengerSettings} />
          <Route exact path='/passenger/update_rating' component={UpdateTripRating} />
        </Switch>
      </div>
    );
  }
}

export default App;
