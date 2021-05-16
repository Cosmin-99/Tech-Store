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
import { ViewProduct } from './pages/view-product';
import { UserProfile } from './pages/user-profile';
import { UserDetails } from './pages/user-details';
import NotFound from './pages/404ErrorPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PrivateRoute } from './components/PrivateRoute';
import { AdminRoute } from './components/AdminRoute';
import AdminDashboard from "./pages/admin/dashboard"
import { ViewProducts } from 'pages/view-products';
import { ViewCart } from 'pages/view-cart';
import { Checkout } from 'pages/checkout';
import { FavoriteProduct } from 'pages/view-favorites';
import { UserOrders } from 'pages/orders';
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
          <Switch>
            <AdminRoute
              path="/admin"
              component={AdminDashboard}
            />
            {/* FallBack route for not-admin user */}
            <Route>
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
                  <PrivateRoute
                    exact
                    path={route(urls.userProfile)}
                    component={UserProfile}
                  />
                  <PrivateRoute
                    exact
                    path={route(urls.favorite)}
                    component={FavoriteProduct}
                  />
                  <PrivateRoute
                    exact
                    path={route(urls.checkout)}
                    component={Checkout}
                  />
                  <PrivateRoute
                    exact
                    path={route(urls.userDetails)}
                    component={UserDetails}
                  />
                  <PrivateRoute
                    exact
                    path={route(urls.comenzi)}
                    component={UserOrders}
                  />
                  <Route
                    path={route(urls.notFound)}
                    component={NotFound}
                  />
                  <Route
                    path={route(urls.cart)}
                    component={ViewCart}
                  />
                  <Route
                    exact
                    path={route(urls.products, ["subCategory"])}
                    component={ViewProducts}
                  />
                  <Route
                    exact
                    path="/"
                  >
                    <Redirect from="/" to={route(urls.shop)} />
                  </Route>
                  <Redirect from="*" to={route(urls.notFound)} />
                </Switch>
              </Container>
            </Route>
          </Switch>
          <ToastContainer />
        </ContextsWrapper>
      </Grid>
    </Grid >
  );
}

export default App;
