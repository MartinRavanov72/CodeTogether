import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import AuthPage from './components/AuthPage/AuthPage.js';
import CodePage from './components/CodePage/CodePage.js';
import Navbar from './components/Navbar/Navbar';

import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import { Container } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: red[600],
    }
  },
});

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  //user does not refresh 

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact component={ CodePage } />
            <Route path="/signIn" exact component={() => (!localStorage.getItem('profile') ? <AuthPage /> : <Redirect to="/" />)} />
          </Switch>
        </Container>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
