import { BrowserRouter as Router,Switch , Route, Link } from 'react-router-dom';
import React from 'react';
import logo from '../logo.svg';
import LoginPage from 'components/Login';
const IndexPage = () => <div className="App">
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to React</h2>
  </div>
  <p className="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
  </p>
</div>;

const rootRouter = <Router>
  <div>
    <Switch>
      <Route path = "/login" component = {LoginPage} />
      <Route path = "/" component = {IndexPage} />
    </Switch>
  </div>
</Router>
export default rootRouter;
