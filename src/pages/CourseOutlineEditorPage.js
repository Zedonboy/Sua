import React, { useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useHistory, useParams } from "react-router-dom";
import {
  updateCourseOutlineThunk,
  createCourseOutlineThunk,
} from "../store/thunk/courseOutline";
import {
  Grid,
  Paper,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { connect, useStore } from "react-redux";
import { StatusEnum } from "../utils/status";

function EditorPage(props) {
  let history = useHistory();
  let store = useStore();
  let { index, outlineIndex } = useParams();
  const [titleState, setTitle] = useState("");
  const [premuimState, setPremuim] = useState(false);
  const [contentState, setContent] = useState("");
  let outline = props.courseOutlines[parseInt(outlineIndex)];
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
                  defaultValue={props.edit ? outline.title : titleState}
                  id="outlined-size-small"
                  autoFocus
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      defaultValue={props.edit ? outline.premium : premuimState}
                      onChange={(e) => {
                        let v = e.target.checked
                        setPremuim(v);
                      }}
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
                          updateCourseOutlineThunk({
                            index: parseInt(index),
                            outlineIndex,
                            data: {
                              ...outline,
                              title: titleState,
                              premium: premuimState,
                              content: contentState,
                            },
                          })
                        );
                      else {
                        let state = store.getState();
                        let course = state.courses.value[parseInt(index)];
                        props.dispatch(
                          createCourseOutlineThunk({
                            index: parseInt(index),
                            outlineIndex,
                            data: {
                              title: titleState,
                              premium: premuimState,
                              content: contentState,
                              course_datum: course.id,
                            },
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
              <CKEditor
                id="editor"
                editor={ClassicEditor}
                data={props.edit ? outline.content : contentState}
                onInit={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  editor.editing.view.change((writer) => {
                    writer.setStyle(
                      "min-height",
                      "20em",
                      editor.editing.view.document.getRoot()
                    );
                  });
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
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
    status: state.courseOutlines.status,
    courseOutlines: state.courseOutlines.value,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
