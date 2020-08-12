import React, { useState } from "react";
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import loginAsync from "../store/thunk/login";
import { connect, useStore } from "react-redux";
import { useHistory } from "react-router-dom";
import { StatusEnum } from "../utils/status";
function LoginForm(props) {
  let [username, setUsername] = useState("");
  let [pass, setPass] = useState("");
  let history = useHistory();
  if (props.loggedIn) history.push("/dashboard");
  return (
    <Paper
      style={{
        padding: "1em",
      }}
    >
      <Grid container direction="column" justify="center">
        {props.error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {props.error.message}
          </Alert>
        ) : null}
        <Typography
          color="primary"
          style={{
            textAlign: "center",
          }}
          variant="h4"
          gutterBottom
        >
          Member Login
        </Typography>
        <TextField
          id="standard-full-width"
          label="Email"
          style={{ margin: 8 }}
          placeholder="johndoe@example.com"
          variant="outlined"
          size="small"
          margin="normal"
          defaultValue={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          type="password"
          label="Password"
          style={{ margin: 8 }}
          placeholder="Password"
          variant="outlined"
          size="small"
          margin="normal"
          defaultValue={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              style={{
                margin: "8px",
              }}
              defaultChecked
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          }
          label="Remember me"
        />
        {props.status == StatusEnum.PENDING ? (
          <CircularProgress color="secondary" />
        ) : (
          <Button
            onClick={() => {
              // make call to login
              props.dispatch(
                loginAsync({
                  //TODO (connect credential to input form)
                  username,
                  password: pass,
                })
              );
            }}
            variant="contained"
            color="secondary"
          >
            Login
          </Button>
        )}
      </Grid>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    status: state.user.status,
    error: state.user.error,
    loggedIn: state.user.value ? true : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
