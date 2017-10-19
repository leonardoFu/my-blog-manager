import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import List from './List';
import Card from './Card';
const testAdd = () => {
  return <h2>12323123</h2>
}
const ArticleRoute = [
  <Route key = "0" path="/add_article" exact = {true} component = {testAdd}></Route>,
  <Route key = "1" path="/article/list" exact = {true} component = {List}></Route>,
  <Route key = "2" path="/articles/:id" exact = {true} component = {Card}></Route>
]



export default ArticleRoute;
