import { createSlice } from "@reduxjs/toolkit";
import fetchCoursesThunk from "../thunk/fetchCourse"
import { StatusEnum } from "../../utils/status";
import {createCourseThunk, updateCourseThunk, deleteCourseThunk} from "../thunk/courses"

let courseListSpice = createSlice({
    name : "course",
    initialState : {
        error : null,
        value : [],
        status : StatusEnum.IDLE
    },

    reducers : {
        updateCourseList (state, action) {
            state.value = action.payload
        },
        addToCourseList (state, action) {
            state.value.push(action.payload)
        },
        updateCourse(state, action){
            state.value[action.payload.index] = action.payload.data
        },

        createCourseOutine (state, action) {
            state.value[action.payload.index].course_outline_data.push(action.payload.data)
        },

        updateCourseOutline (state, action) {
            state.value[action.payload.index].course_outline_data[action.payload.outlineIndex] = action.payload.data
        },

        deleteCourseAction (state, action) {
            state.value.splice(action.payload, 1)
        },

        clearError (state) {
            state.error = null
        }
    },

    extraReducers : {
        [fetchCoursesThunk.fulfilled] : (state, action) => {
            state.status = StatusEnum.SUCCESS
            state.value = action.payload
        },

        [fetchCoursesThunk.pending] : (state, action) => {
            state.status = StatusEnum.PENDING
            state.error = null
        },

        [fetchCoursesThunk.rejected] : (state, action) => {
            state.status = StatusEnum.FAILED
            state.error = action.error
        },

        [createCourseThunk.pending] : (state, action) => {
            state.status = StatusEnum.PENDING
            state.error = null
        },

        [createCourseThunk.fulfilled] : (state, action) => {
            state.status = StatusEnum.SUCCESS
            state.error = null
            state.value.push(action.payload)
        },

        [createCourseThunk.rejected] : (state, action) => {
            state.status = StatusEnum.FAILED
            state.error = action.error
        },

        [updateCourseThunk.pending] : (state, action) => {
            state.status = StatusEnum.PENDING
            state.error = null
        },

        [updateCourseThunk.rejected] : (state, action) => {
            state.status = StatusEnum.FAILED
            state.error = action.error
        },

        [updateCourseThunk.fulfilled] : (state, action) => {
            state.status = StatusEnum.SUCCESS
            state.error = null
            state.value[action.payload.index] = action.payload.data
        },

        [deleteCourseThunk.pending] : (state, action) => {
            state.status = StatusEnum.PENDING
            state.error = null
        },

        [deleteCourseThunk.rejected] : (state, action) => {
            state.status = StatusEnum.FAILED
            state.error = action.error
        },

        [deleteCourseThunk.fulfilled] : (state, action) => {
            state.status = StatusEnum.SUCCESS
            state.error = null
            state.value.splice(action.payload, 1)
        },
    }
})

export const {updateCourseList, 
    addToCourseList, 
    updateCourse, 
    deleteCourseAction,
    clearError,
    createCourseOutine,
    updateCourseOutline
} = courseListSpice.actions
export default courseListSpice.reducer