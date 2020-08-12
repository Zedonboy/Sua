import React from "react";
import { Grid, Paper, Typography, Divider, List, ListItem, ListItemText, ListItemSecondaryAction,
Chip } from "@material-ui/core";
import {Done} from "@material-ui/icons"
import { connect } from "react-redux";
function generate(element) {
  return [0].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
function HomePage(props) {
  return (
    <Grid container spacing={4} direction="row">
      <Grid item xs={6}>
        <Paper
          style={{
            padding: "1em",
            minHeight: "10em",
            borderLeft: "8px solid blue",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Hi {props.user.email}
          </Typography>

          <Typography variant="body2" gutterBottom>
            Obviously dashboard is pretty basic, we will add Features to suit
            you. currently we are on beta. <br/> We only shipped, minimal features
            to you. Thanks for understand
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper
          style={{
            padding: "1em",
            minHeight: "10em",
          }}
        >
          <Typography variant="h5">Features</Typography>
          <Divider />
          <List dense={true}>
            {generate(
              <ListItem>
                <ListItemText
                  primary="Coming Soon"
                  secondary="here we will tell new cool features"
                />
                <ListItemSecondaryAction>
                  {/* <Chip
                    variant="outlined"
                    size="small"
                    label=""
                    deleteIcon={<Done />}
                  /> */}
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    user : state.user.value
  }
}
export default connect(mapStateToProps)(HomePage)
