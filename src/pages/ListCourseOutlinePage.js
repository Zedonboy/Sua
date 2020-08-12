import React from "react";
import MaterialTable from "material-table";
import {connect} from "react-redux"
import { useParams, useHistory } from "react-router-dom";
import {deleteCourseOutlineThunk} from "../store/thunk/courseOutline"

const columns = [
  { title: "Title", field: "name" },
];

function ListCourseOutlinePage(props) {
  let history = useHistory()
  let {index} = useParams()
  let data = props.courseOutlineList.map(o => ({...o}))
  return (
    <MaterialTable
      title="Course Outline"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: async (newData) => {
          history.push(`/dashboard/course/${index}/courseOutline/new`)
        },
        onRowUpdate: async (newData, oldData) => {
          history.push(`/dashboard/course/${index}/courseOutline/${oldData.tableData.id}/edit`)
        },
        onRowDelete: async (oldData) => {
          let outline = props.courseOutlineList[oldData.tableData.id]
          props.dispatch(deleteCourseOutlineThunk({
            index : oldData.tableData.id,
            data : outline
          }))
        }
      }}
    />
  );
}

const mapStateToProps = state => {
  return {
    courseOutlineList : state.courseOutlines.value
  }
}

const mapDispatchToProps = dispatch => {
  return {dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCourseOutlinePage)