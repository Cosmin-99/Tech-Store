import { Container, Grid, makeStyles } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { ForgotPassword } from './pages/forgot-password';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Shop } from './pages/shop';
import { route, urls } from './utils/routing';
import ContextsWrapper from "./contexts/contextsWrapper"
import { ViewSubCategory } from './pages/view-subcategory';
import { ViewProduct } from './pages/view-products';
import { UserProfile } from './pages/user-profile';
import { UserDetails } from './pages/user-details';
const useStyles = makeStyles((theme) => ({
  container: {
    // minHeight: "100vh",
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
        <ContextsWrapper>
          <Header />
          <Container className={classes.container}>
            <Switch>
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
              <Route
                exact
                path={route(urls.shop)}
                component={Shop}
              />
              <Route
                exact
                path={route(urls.forgotPassword)}
                component={ForgotPassword}
              />
              <Route
                path={route(urls.subcategory, ["id"])}
                component={ViewSubCategory}
              />
              <Route
                path={route(urls.product, ["id"])}
                component={ViewProduct}
              />
              <Route
                path={route(urls.userProfile)}
                component={UserProfile}
              />
              <Route
                path={route(urls.userDetails)}
                component={UserDetails}
              />
              <Redirect from="/" to={route(urls.shop)} />
            </Switch>
          </Container>
        </ContextsWrapper>
      </Grid>
    </Grid>
  );
}

export default App;
