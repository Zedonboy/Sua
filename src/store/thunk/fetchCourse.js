import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCourses } from "../../utils/api";

const fetch = createAsyncThunk("courses/fetch", async (_, {getState}) => {
    let state = getState()
    let email = state.user.value?.email
    if(!email) throw "Error please login again"
    let response = await fetchCourses(email)
    if(response.ok){
        return await response.json()
    } else throw new Error(`Error: ${response.status}, ${response.statusText}`)
})

export default fetch