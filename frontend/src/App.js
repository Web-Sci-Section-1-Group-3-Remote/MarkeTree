import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from './components/Footer/Footer'
import Homepage from './pages/Homepage/Homepage'
import About from './pages/About/About'
import Event from './pages/Event/Event'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup';
import Help from './pages/Help/Help'
import CreateListing from './pages/CreateListing/CreateListing';
import BrowseListing from './pages/BrowseListing/BrowseListing';
import Listing from './pages/Listing/Listing';
import Dashboard from'./pages/Dashboard/Dashboard';

import './App.css';


class App extends React.Component {
  render() {
    //const [selectName,setName] = useState('unknown')
    return (
      <Router>
        <div>
          <Route exact path='/' component={Homepage} />
          <Route path='/about' component={About} />
          <Route path='/event' component={Event} />
          <Route path='/login' component={Login} />
          <Route path='/Signup' component={Signup} />
          <Route path='/help' component={Help} />
          <Route path='/create' component={CreateListing} />
          <Route path='/browseListing' component={BrowseListing} />
          <Route path='/listing' component={Listing} />
          <Route path='/dashboard' component={Dashboard}/>

        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
