import React, { Component } from 'react';

import './App.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'material-ui-icons';
import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue, deepOrange } from 'material-ui/colors'
import router from './routes';
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepOrange
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme = {theme}>
        {router}
      </MuiThemeProvider>
    );
  }
}

export default App;
