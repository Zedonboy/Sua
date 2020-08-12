import {createSlice} from "@reduxjs/toolkit"
import loginThunk from "../thunk/login"
import { StatusEnum } from "../../utils/status"

let userSlice = createSlice({
    name : "user",
    initialState : {
        error : null,
        value : null,
        status : StatusEnum.IDLE
    },
    reducers : {
        updateUser (state, action) {
            state.value = action.payload
        }
    },
    extraReducers : {
        [loginThunk.pending] : (state) => {
            state.status = StatusEnum.PENDING
            state.error = null
        },

        [loginThunk.fulfilled] : (state, action) => {
            state.status = StatusEnum.SUCCESS
            state.value = action.payload
            state.error = null
        },
        [loginThunk.rejected] : (state, action) => {
            state.status = StatusEnum.FAILED
            state.error = action.error
        }
    }
})

export const {updateUser} = userSlice.actions
export default userSlice.reducer