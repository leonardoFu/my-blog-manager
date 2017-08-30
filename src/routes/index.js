import { BrowserRouter as Router,Switch , Redirect, Route, Link } from 'react-router-dom';
import React from 'react';
import Home from 'components/Home';
import Login from 'components/Login';
import Menu from 'common/Menu';



const rootRouter = <Router>
  <div>
    <Menu></Menu>
    <Switch>
      <Route path = "/login" component = {Login} />
      <Route path = "/" render = {() => {
        let cookie = document.cookie;
        if(cookie){
          return <Home></Home>
        }
        return  <Redirect to="/login"/>
      }} />
    </Switch>
  </div>
</Router>
export default rootRouter;
