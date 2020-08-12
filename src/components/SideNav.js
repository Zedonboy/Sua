import React from "react";
import DescriptionIcon from "@material-ui/icons/Description";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import fetchCourse from "../store/thunk/fetchCourse"
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function SideNave(props) {
  const classes = useStyles();
  let history = useHistory()
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["Courses"].map((text, index) => (
          <ListItem onClick={e => {
            props.dispatch(fetchCourse());
            history.push("/dashboard/course")
          }} button key={text}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

const mapDispatchToProps = dispatch => {
  return {dispatch}
}

export default connect(null,mapDispatchToProps)(SideNave)