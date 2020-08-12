import React, {useEffect} from "react";
import { Grid, Fab, CircularProgress } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import CourseCard from "../components/Course";
import { useRouteMatch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import { clearError } from "../store/slices/courseList";
import {addCourseOutlines} from "../store/slices/courseOutlineList"
import { StatusEnum } from "../utils/status";

function ListCoursePage(props) {
  let { path } = useRouteMatch();
  let history = useHistory();
  return (
    <Grid direction="row" spacing={2} container xs={12}>
      {props.error ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {props.error.message}
          {setTimeout(() => {
            props.dispatch(clearError());
          }, 10000) ? null : null}
        </Alert>
      ) : null}

      {
        props.status == StatusEnum.PENDING ? (<Grid item xs={12} justify="center">
          <CircularProgress color="secondary"></CircularProgress>
        </Grid>) : null
      } 

      {
        props.list.map((course, idx) => (
          <CourseCard onEdit={() => {  
            history.push(`/dashboard/course/${idx}/edit`)
          }} onClick={ () => {
            props.dispatch(addCourseOutlines(course.course_outline_data))
            history.push(`/dashboard/course/${idx}/courseOutLine`) 
          }
          } desc={course.desc} title={course.title} />
        ))
      }
        
      <Fab
      style={{
        bottom : "20px",
        right : "20px",
        position:"absolute"
      }}
        onClick={(e) => {
          history.push(`${path}/new`);
        }}
        variant="extended"
      >
        <Add />
        Add
      </Fab>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    status : state.courses.status,
    list: state.courses.value,
    error: state.courses.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCoursePage);
