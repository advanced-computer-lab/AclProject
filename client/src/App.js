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
import AdvancedSearch from './components/AdvancedSearch';
import AdvancedSearchResults from './components/AdvancedSearchResults';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/create-flight' component={CreateFlight} />
		  <Route path='/advanced-search' component={AdvancedSearch} />
		  <Route path='/advanced-search-results' component={AdvancedSearchResults} />
		  <Route path='/registration' component={Registration} />
		  <Route path='/show-flight-list' component={ShowFlightList} />
          <Route path='/edit-flight/:id' component={UpdateFlightInfo} />
          <Route path='/show-flight/:id' component={ShowFlightDetails} />
		  <Route exact path='/admin-show-flight-list' component={AdminShowFlightList} />
		  <Route path='/admin-show-flight/:id' component={AdminShowFlightDetails} />
        </div>
      </Router>
    );
  }
}

export default App;