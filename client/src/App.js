import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Footer from "./components/Footer";

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import AccountSecurity from './components/AccountSecurity';
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
import ReservedShowFlightDetails from './components/ReservedShowFlightDetails';
import SelectFlights from './components/SelectFlights';
import ChangeFlight from './components/ChangeFlight';
import SeatsSelectionDeparture from './components/SeatsSelectionDeparture';
import SeatsSelectionReturn from './components/SeatsSelectionReturn';
import ReservationSummary from './components/ReservationSummary';
import FlightReserved from './components/FlightReserved';
import ChangeReservation from './components/ChangeReservation';
import ChangeSeats from './components/ChangeSeats';
import ChangeSeats2 from './components/ChangeSeats2';
import SeatsSelectionWhenChangingFlight from './components/SeatsSelectionWhenChangingFlight';
import ChangeFlightSummary from './components/ChangeFlightSummary';
import ForgotPassword from './components/ForgotPassword';
import ForgotPassword2 from './components/ForgotPassword2';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <div>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/login' component={Login} />
          <Route path='/select-flights' component={SelectFlights} />
          <Route path='/change-flight' component={ChangeFlight} />
		  <Route path='/seats-selection-when-changing-flight' component={SeatsSelectionWhenChangingFlight} />
          <Route path='/seats-selection-departure' component={SeatsSelectionDeparture} />
		  <Route path='/about-us' component={AboutUs} />
		  <Route path='/forgot-password' component={ForgotPassword} />
		  <Route path='/forgot-password2' component={ForgotPassword2} />
		  <Route path='/contact-us' component={ContactUs} />
		  <Route path='/change-flight-summary' component={ChangeFlightSummary} />
          <Route path='/flight-reserved' component={FlightReserved} />
          <Route path='/reservation-summary' component={ReservationSummary} />
          <Route path='/seats-selection-return' component={SeatsSelectionReturn} />
          <Route path='/create-flight' component={CreateFlight} />
          <Route path='/profile' component={Profile} />
          <Route path='/advanced-search' component={AdvancedSearch} />
          <Route path='/advanced-search-results' component={AdvancedSearchResults} />
          <Route path='/show-flight-list-guest' component={ShowFlightListGuest} />
          <Route path='/not-authorized' component={NotAuthorized} />
          <Route path='/registration' component={Registration} />
          <Route path='/edit-profile' component={EditProfile} />
          <Route path='/account-security' component={AccountSecurity} />
          <Route path='/show-flight-list' component={ShowFlightList} />
          <Route path='/edit-flight/:id' component={UpdateFlightInfo} />
          <Route path='/show-flight/:id' component={ShowFlightDetails} />
          <Route exact path='/admin-show-flight-list' component={AdminShowFlightList} />
          <Route path='/admin-show-flight/:id' component={AdminShowFlightDetails} />
          <Route path='/reserved-flights/' component={ReservedFlights} />
          <Route path='/change-reservation/' component={ChangeReservation} />
          <Route path='/change-seats/' component={ChangeSeats} />
          <Route path='/change-seats2/' component={ChangeSeats2} />
          <Route path='/ReservedFlightSummary/' component={ReservedFlightSummary} />
          <Route path='/reserved-show-flight/:id' component={ReservedShowFlightDetails} />
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;