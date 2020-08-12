import React from "react";
import LoginPage from "./pages/Login";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import { connect } from "react-redux";

let jwtToken = null;

class App extends React.Component {
  render() {
    return (
      <div className="App-header">
        <Switch>
          <Route exact path="/user/login">
            <LoginPage />
          </Route>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route exact path="/">
            {this.props.loggedIn ? <Redirect to="/dashboard"/> : <Redirect to="/user/login"/>}
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let token = state.jwt.value;
  if (!token)
    return {
      loggedIn: false,
    };
  if (token != jwtToken) {
    document.cookie = `jwt=${token}`;
  }
  return {
    isLoggedIn: true,
  };
};

export default connect(mapStateToProps)(App)
