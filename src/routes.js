import React from "react"
import { Route, Redirect } from "react-router-dom"
import Hoc from "./hoc/hoc"

import Login from "./containers/Login"
import Signup from "./containers/Signup"
import LandingPage from "./containers/LandingPage"
import Demo from "./containers/Demo"
import ChangeEmail from "./containers/Account/ChangeEmail"
import ChangePassword from "./containers/Account/ChangePassword"
import Billing from './containers/Account/Billing'
import APIKey from "./containers/Account/APIKey"

/* create route component, check if authenticated and allows to view route,
otherwise, redirected to login route  */
// ...rest is the spread of the other arguements
const PrivateRoute = ({ component: Component, ...rest }) => {
  //get the token, if null, we are NOT authenticated
  const authenticated = localStorage.getItem("token") !== null
  return (
    <Route {...rest} render={props =>
      //if true
      authenticated === true ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: "/login",
            state: { from: props.location }
          }}
          />
        )
    }
    />
  )
}

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={LandingPage} />
    <Route path="/login/" component={Login} />
    <Route path="/signup/" component={Signup} />
    <Route path="/demo/" component={Demo} />
    <PrivateRoute path="/account/change-email" component={ChangeEmail} />
    <PrivateRoute path="/account/change-password" component={ChangePassword} />
    <PrivateRoute path="/account/billing" component={Billing} />
    <PrivateRoute path="/account/api-key" component={APIKey} />
  </Hoc>
);

export default BaseRouter;
