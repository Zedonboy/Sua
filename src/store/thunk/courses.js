import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCourse, updateCourse, deleteCourse } from "../../utils/api";

export const createCourseThunk = createAsyncThunk(
  "course/create",
  async (data, { dispatch, getState }) => {
    let state = getState();
    let jwt = state.jwt.value;
    if (jwt) {
      let response = await createCourse(data, jwt);
      if (response.ok) {
        return await response.json()
      } else {
        let respData = await response.json()
        throw new Error(`Error:${response.status}\n${respData.message}`);
      }
    } else throw new Error("Please re-login");
  }
);

export const updateCourseThunk = createAsyncThunk(
  "course/update",
  async ({ data, index }, { dispatch, getState }) => {
    let state = getState();
    let jwt = state.jwt.value;
    if (jwt) {
      let response = await updateCourse(data, jwt);
      if (response.ok) {
        return { index, data: await response.json() }
      } else {
        let respData = await response.json()
        throw new Error(`Error:${response.status}\n${respData.message}`);
      }
    } else throw new Error("Please re-login");
  }
);

export const deleteCourseThunk = createAsyncThunk(
  "course/delete",
  async ({data, index}, { dispatch, getState }) => {
    let state = getState();
    let jwt = state.jwt.value;
    if (jwt) {
      let response = await deleteCourse(data, jwt)
      if (response.ok) {
        return index
      } else {
        let respData = await response.json()
        throw new Error(`Error:${response.status}\n${respData.message}`);
      }
    } else throw new Error("Please re-login");
  }
);
