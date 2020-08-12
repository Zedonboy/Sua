import { createSlice } from "@reduxjs/toolkit";

let jwtSlice = createSlice({
    name : "jwt",
    initialState : {
        value : null
    },
    reducers : {
        updateJwt (state, action) {
            state.value = action.payload
        } 
    }
})

export const {updateJwt} = jwtSlice.actions
export default jwtSlice.reducer