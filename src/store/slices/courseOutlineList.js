import { createSlice } from "@reduxjs/toolkit";
import {createCourseOutlineThunk, updateCourseOutlineThunk, deleteCourseOutlineThunk} from "../thunk/courseOutline"
import { StatusEnum } from "../../utils/status";
const courseOutlineSlice = createSlice({
    name : "courseOutline",
    initialState : {
        status : StatusEnum.IDLE,
        value : [],
        error : null
    },

    reducers : {
        addCourseOutlines(state, action){
            state.value = action.payload
        },

        addOutlineToCourse (state, action) {
            state.value.push(action.payload)
        },

        updateOutlineToCourse (state, action) {
            state.value[action.payload.index] = action.payload.data
        },

        deleteOutlineToCourse(state, action) {
            state.value.splice(action.payload.index, 1)
        }
    },

    extraReducers : {
        [createCourseOutlineThunk.pending] : (state) => {
            state.error = null
            state.status = StatusEnum.PENDING
        },

        [createCourseOutlineThunk.rejected] : (state, action) => {
            state.error = action.error
            state.status = StatusEnum.FAILED
        },

        [createCourseOutlineThunk.fulfilled] : (state,action) => {
            state.error = null
            state.status = StatusEnum.SUCCESS
        },

        [updateCourseOutlineThunk.pending] : state => {
            state.error = null
            state.status = StatusEnum.PENDING
        },

        [updateCourseOutlineThunk.rejected] : (state, action) => {
            state.error = action.error
            state.pending = StatusEnum.FAILED
        },

        [updateCourseOutlineThunk.fulfilled] : (state, action) => {
            state.error = null
            state.status = StatusEnum.SUCCESS
            state.value[action.payload.index] = action.payload.data
        },

        [deleteCourseOutlineThunk.pending] : state => {
            state.error = null
            state.status = StatusEnum.PENDING
        },

        [deleteCourseOutlineThunk.rejected] : (state, action) => {
            state.error = action.error
            state.status = StatusEnum.FAILED
        },

        [deleteCourseOutlineThunk.fulfilled] : (state, action) => {
            state.error = null
            state.status = StatusEnum.SUCCESS
            state.value.splice(action.payload.index, 1)
        }
    }
})

export const {addCourseOutlines, addOutlineToCourse, updateOutlineToCourse, deleteOutlineToCourse} = courseOutlineSlice.actions
export default courseOutlineSlice.reducer