import {createAsyncThunk} from "@reduxjs/toolkit"
import {createCourseOutline, updateCourseOutline as updateCourseOutlineAPI, deleteCourseOutline} from "../../utils/api"
import {createCourseOutine, updateCourseOutline} from "../slices/courseList"

export const createCourseOutlineThunk = createAsyncThunk("courseOutline/create", async ({index, data, outlineIndex}, {dispatch, getState}) => {
    let state = getState();
    let jwt = state.jwt.value;
    if (jwt) {
      let response = await createCourseOutline(data, jwt)
      if (response.ok) {
        let data = await response.json()
        dispatch(createCourseOutine({index, data, outlineIndex}))
        return {index, data}
      } else
        throw new Error(`Error:${response.status}\n${response.statusText}`);
    } else throw new Error("Please re-login");
})

export const updateCourseOutlineThunk = createAsyncThunk("courseOutline/update", async ({data, index, outlineIndex}, {dispatch, getState}) => {
    let state = getState();
    let jwt = state.jwt.value;
    if (jwt) {
      let response = await updateCourseOutlineAPI(data, jwt)
      if (response.ok) {
        let data = await response.json()
        dispatch(updateCourseOutline({index, outlineIndex, data}))
        return {index, data}
      } else
        throw new Error(`Error:${response.status}\n${response.statusText}`);
    } else throw new Error("Please re-login");
})

export const deleteCourseOutlineThunk = createAsyncThunk("courseOutline/delete", async ({data, index}, {dispatch, getState}) => {
    let state = getState();
    let jwt = state.jwt.value;
    if (jwt) {
      let response = await deleteCourseOutline(data, jwt)
      if (response.ok) {
        return {index, data : await response.json()};
      } else
        throw new Error(`Error:${response.status} ${response.statusText}`);
    } else throw new Error("Please re-login");
})
