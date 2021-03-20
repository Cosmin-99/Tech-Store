import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { route, urls } from './utils/routing';
const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    maxWidth: "100%",
    padding: 0,
    marginBottom: "20px",
    [theme.breakpoints.up('sm')]: {
      maxWidth: "88%",
      padding: "2rem 4rem 8rem",
    },
  }
}));
function App() {
  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item container alignItems="stretch" direction="column">
        <Header />
        <Container className={classes.container}>
          <Route
            exact
            path={route(urls.login)}
            component={Login}
          />
          <Route
            exact
            path={route(urls.register)}
            component={Register}
          />
        </Container>
      </Grid>
    </Grid>
  );
}

export default App;
