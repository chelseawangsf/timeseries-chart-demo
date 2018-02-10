import React, { Component } from 'react';
import logo from './logo.svg';
import Rx from 'rxjs/Rx';
import './App.css';

import PropTypes from 'prop-types';

import Typography from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimeSeriesChart from './components/TimeSeriesChart';

import Header from './components/Header';
import Toolbar from 'material-ui/Toolbar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import * as Colors from 'material-ui/styles/colors'
import { grey800 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey800,
    
  },
  appBar: {
    height: 40,
  },
});


const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div clasName="container">
      <div className="row">
      <Header/>
      </div>
      <TimeSeriesChart />
    </div>


  </MuiThemeProvider>
);

export default App;
