import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from './components/Footer/Footer'
import Homepage from './pages/Homepage/Homepage'
import About from './pages/About/About'
import BrowseEvent from './pages/BrowseEvent/BrowseEvent'
import Login from './pages/Login/Login'
import Help from './pages/Help/Help'
import CreateLising from './pages/CreateListing/CreateListing';
import BrowseListing from './pages/BrowseListing/BrowseListing';
import Listing from './pages/Listing/Listing';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Homepage} />
          <Route path='/about' component={About} />
          <Route path='/event' component={BrowseEvent} />
          <Route path='/login' component={Login} />
          <Route path='/help' component={Help} />
          <Route path='/create' component={CreateLising} />
          <Route path='/browseListing' component={BrowseListing} />
          <Route path='/listing' component={Listing} />

        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
