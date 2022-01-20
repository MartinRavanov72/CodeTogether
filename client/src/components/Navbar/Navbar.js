import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { LOGOUT } from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: LOGOUT });

    setUser(null);

    history.push('/signIn');
  };

  const routeChangeSignIn = () => { 
    history.push("/signIn");
  }

  const routeChangeCodeEditor = () => { 
    history.push("/");
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.img}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button onClick={routeChangeCodeEditor} className={classes.btn} variant="contained" color="secondary">Code Editor</Button>
            <Button variant="contained" className={classes.btn} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
            <div className={classes.profile}>
              <Button onClick={routeChangeCodeEditor} className={classes.btn} variant="contained" color="secondary">Code Editor</Button>
              <Button onClick={routeChangeSignIn} className={classes.btn} variant="contained" color="secondary">Sign In</Button>
          </div>
        )}
      </Toolbar>
    </AppBar> 
  );
};

export default Navbar;
