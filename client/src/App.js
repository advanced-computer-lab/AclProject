import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import CreateFlight from './components/CreateFlight';
import ShowFlightList from './components/ShowFlightList';
import ShowFlightDetails from './components/ShowFlightDetails';
import AdminShowFlightList from './components/AdminShowFlightList';
import AdminShowFlightDetails from './components/AdminShowFlightDetails';
import UpdateFlightInfo from './components/UpdateFlightInfo';
import Registration from './components/Registration';
import Login from './components/Login';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import AdvancedSearch from './components/AdvancedSearch';
import AdvancedSearchResults from './components/AdvancedSearchResults';
import ShowFlightListGuest from './components/ShowFlightListGuest';
import NotAuthorized from './components/NotAuthorized';
import ReservedFlights from './components/ReservedFlights';
import ReservedFlightSummary from './components/ReservedFlightSummary';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/create-flight' component={CreateFlight} />
          <Route path='/profile' component={Profile} />
		      <Route path='/advanced-search' component={AdvancedSearch} />
		      <Route path='/advanced-search-results' component={AdvancedSearchResults} />
			  <Route path='/show-flight-list-guest' component={ShowFlightListGuest} />
			  <Route path='/not-authorized' component={NotAuthorized} />
		      <Route path='/registration' component={Registration} />
          <Route path='/edit-profile' component={EditProfile} />
		      <Route path='/show-flight-list' component={ShowFlightList} />
          <Route path='/edit-flight/:id' component={UpdateFlightInfo} />
          <Route path='/show-flight/:id' component={ShowFlightDetails} />
		      <Route exact path='/admin-show-flight-list' component={AdminShowFlightList} />
		      <Route path='/admin-show-flight/:id' component={AdminShowFlightDetails} />
          <Route path='/reservedflights/' component={ReservedFlights} />
          <Route path='/ReservedFlightSummary/' component={ReservedFlightSummary} />
        </div>
      </Router>
    );
  }
}

export default App;