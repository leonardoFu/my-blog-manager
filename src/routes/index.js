import { BrowserRouter as Router,Switch , Redirect, Route } from 'react-router-dom';
import React from 'react';
import Home from 'components/Home';
import Login from 'components/Login';

import authUtil from 'utils/authUtil';

const rootRouter = <Router>
  <div>
    <Switch>
      <Route key = "login" path = "/login" component = {Login} />
      <Route key = "root" path = "/" render = {() => {
        if(authUtil.checkLogin()){
          return <Home></Home>
        }
        return  <Redirect to="/login"/>
      }} >
      </Route>
    </Switch>
  </div>
</Router>
export default rootRouter;
