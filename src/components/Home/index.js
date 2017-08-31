import logo from '@/logo.svg';
import React, { Component } from 'react';
import { connect } from 'react-redux';


class IndexPage extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to 豪爷的小站后台</h2>
      </div>
    </div>
  }
}

export default connect((menu) => ({menu}))(IndexPage);
