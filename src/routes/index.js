import { BrowserRouter as Router,Switch , Redirect, Route, Link } from 'react-router-dom';
import React from 'react';
import Home from 'components/Home';
import Login from 'components/Login';
import Menu from 'common/Menu';

import authUtil from 'utils/authUtil';

const rootRouter = <Router>
  <div>
    <Switch >
      <Route path = "/login" component = {Login} />
      <Route path = "/" render = {() => {
        if(authUtil.checkLogin()){
          return <div><Menu></Menu><Home></Home></div>
        }
        return  <Redirect to="/login"/>
      }} >
      </Route>
    </Switch>
  </div>
</Router>
export default rootRouter;
