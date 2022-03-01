import React from 'react';
// import './app.css';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard.js';
import Preferences from '../preferences/preferences.js';

function App() {
    return (
        <div className="wrapper">
          <h1>Application</h1>
          <BrowserRouter>
            <Switch>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/preferences">
                <Preferences />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      );
}

export default App;