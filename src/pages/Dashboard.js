import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Grid, IconButton } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import EditorPage from "./CourseOutlineEditorPage"
import SideNav from "../components/SideNav"
import HomePage from "./DashboardHomePage";
import { Route, useRouteMatch, Redirect, useHistory, Switch } from "react-router-dom";
import CoursesPage from "./ListCoursesPage"
import CourseOutlinePage from "./ListCourseOutlinePage"
import CourseEditPage from "./CourseEditPage"
import { connect } from "react-redux";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function DashboardPage(props) {
  const classes = useStyles();
  let {path, url} = useRouteMatch();
  let history = useHistory()
  if(!props.loggedIn) return <Redirect to="/user/login"/>
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={e => {
            history.goBack()
          }} edge="start" color="inherit" aria-label="menu">
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h6">News</Typography>
        </Toolbar>
      </AppBar>
      <SideNav/>
      <main style={{
        minHeight : "100vh"
      }} className={classes.content}>
        <div className={classes.toolbar} />
        <Grid
          item
          xs={12}
          style={{
            padding: "2em",
            height : "100%"
          }}
        >
          <Switch>
            <Route exact path={`${path}/`}>
              <HomePage/>
            </Route>
            <Route exact path={`${path}/course`}>
              <CoursesPage/>
            </Route>
            <Route exact path={`${path}/course/:index/edit`}>
              <CourseEditPage edit={true}/>
            </Route>
            <Route exact path={`${path}/course/new`}>
              <CourseEditPage/>
            </Route>
            <Route exact path={`${path}/course/:index/courseOutLine`}>
              <CourseOutlinePage/>
            </Route>
            <Route exact path={`${path}/course/:index/courseOutline/:outlineIndex/edit`}>
              <EditorPage edit={true}/>
            </Route>
            <Route exact path={`${path}/course/:index/courseOutline/new`}>
              <EditorPage edit={false}/>
            </Route>
          </Switch>
        </Grid>
      </main>
    </div>
  );
}

const mapStateToProp = state => {
  let user = state.user.value
  return {
    loggedIn : user ? true : false
  }
}

export default connect(mapStateToProp)(DashboardPage)