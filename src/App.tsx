import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './containers/Signup/Signup';
import Main from './containers/Main/Main';
import Login from './containers/Login/Login';
import Stats from './containers/Stats/Stats';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Main} />
        <Route path="/stats" component={Stats}/>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Router>
    </div>
  );
}

export default App;
