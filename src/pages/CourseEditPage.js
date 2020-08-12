import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  CircularProgress
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { updateCourseThunk, createCourseThunk } from "../store/thunk/courses";
import {StatusEnum} from "../utils/status"
function CourseEditorPage(props) {
  let history = useHistory();
  let { index } = useParams();
  let data = props.list[parseInt(index)]
  let [titleState, setTitle] = useState(data?.title || "");
  let [premuimState, setPremuim] = useState(data?.premium || false);
  let [descState, setDesc] = useState(data?.desc || "");

  return (
    <Grid
      style={{
        height: "100%",
      }}
      spacing={3}
      container
      item
    >
      <Grid
        style={{
          height: "100%",
        }}
        item
        xs={10}
      >
        <Paper
          style={{
            height: "100%",
            padding: "1em",
          }}
          xs={12}
        >
          <Grid
            style={{
              height: "100%",
            }}
            spacing={4}
            alignContent="stretch"
            direction="column"
            container
          >
            <Grid direction="row" container item>
              <Grid item xs={6}>
                <TextField
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  label="Title"
                  id="outlined-size-small"
                  autoFocus
                  variant="outlined"
                  size="small"
                  autoFocus
                  defaultValue={titleState}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e) => {
                        setPremuim(e.target.checked);
                      }}
                      defaultValue={premuimState}
                      name="premuim"
                    />
                  }
                  label="Premium"
                />
                {props.status == StatusEnum.PENDING ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Button
                    onClick={(e) => {
                      if (props.edit)
                        props.dispatch(
                          updateCourseThunk({
                            index,
                            data: {
                              ...data,
                              title: titleState,
                              premium: premuimState,
                              desc: descState
                            },
                          })
                        );
                      else {
                        props.dispatch(
                          createCourseThunk({
                              title: titleState,
                              premium : premuimState,
                              desc : descState
                          })
                        );
                      }
                    }}
                    variant="outlined"
                    color="secondary"
                  >
                    Save
                  </Button>
                )}
              </Grid>
            </Grid>

            <Grid item>
              <TextField
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                xs={12}
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                defaultValue={descState}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    list: state.courses.value,
    status : state.courses.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseEditorPage);
