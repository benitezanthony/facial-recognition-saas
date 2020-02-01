import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authSignup as signup } from "../store/actions/auth";

class RegistrationForm extends React.Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: "",
    formError: null
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password1, password2 } = this.state;

    /* used to verify all form fields were provided a value */
    if (username !== '' && email !== '' && password1 !== '' && password2 !== ''
      && this.comparePasswordLength() === true) {
      this.props.signup(username, email, password1, password2);
    }

    if (username === '' || email === '' || password1 === '' || password2 === '') {
      this.setState({
        formError: "Please enter all credentials (username, email, matching passwords)"
      })
    }


  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      /* use to reset error messages when user begins typing */
      formError: null
    });
  };


  comparePasswordLength = () => {
    const { password1, password2 } = this.state

    if (password1.length >= 6 && password2.length >= 6) {
      return true
    }
    else {
      this.setState({
        formError: "Password must be a minimum of 6 characters",
      })
      return false
    }
  }

  render() {
    const { username, email, password1, password2, formError } = this.state;
    const { error, loading, authenticated } = this.props;

    if (authenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Create your account
          </Header>
          {error && <p>{this.props.error.message}</p>}

          <React.Fragment>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  onChange={this.handleChange}
                  value={username}
                  name="username"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                />
                <Form.Input
                  onChange={this.handleChange}
                  value={email}
                  name="email"
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                  type="email"
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={password1}
                  name="password1"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={password2}
                  name="password2"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm password"
                  type="password"
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  loading={loading}
                  disabled={loading}
                >
                  Signup
                </Button>
              </Segment>
            </Form>
            {formError && (
              <Message negative>
                <Message.Header>A form error occurred</Message.Header>
                <p>{formError}</p>
              </Message>
            )}
            {error && (
              <Message negative>
                <Message.Header>An error occurred</Message.Header>
                <p>{error}</p>
              </Message>
            )}
            <Message>
              Already have an account? <NavLink to="/login">Login</NavLink>
            </Message>
          </React.Fragment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    authenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (username, email, password1, password2) =>
      dispatch(signup(username, email, password1, password2))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);
