import React, { Component } from 'react';

import './App.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'material-ui-icons';
import 'typeface-roboto';
import { MuiThemeProvider } from 'material-ui/styles';
import createMuiTheme from 'material-ui/styles/theme';
import router from './routes';
const theme = createMuiTheme();

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
