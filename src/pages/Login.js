import React from "react";
import { Grid } from "@material-ui/core";
import LoginForm from "../components/LoginForm";

export default class LoginPage extends React.Component {
  render() {
    return (
        <Grid
        style={{
          backgroundColor : "seashell",
          minHeight : "100vh"
        }}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <LoginForm />
          </Grid>
        </Grid>
    );
  }
}
