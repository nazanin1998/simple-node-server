//  /** @jsx React.Dom */
 import createClass from 'create-react-class';
// var ReactDOMServer = require('react-dom')
// import Dashboard from '../dashboards/dashboard'
// import Preferences from '../preferences/preferences'
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
var React = require('react')
const App = createClass({
    render: () => (
        <div className="wrapper">
      <h1>Application</h1>
      {/* <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter> */}
    </div>
        //React.createElement('div', null, 'Hello World!')

    ),
  });  
    export default App;