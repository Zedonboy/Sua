import { createAsyncThunk } from "@reduxjs/toolkit";
import {loginUserAPI} from "../../utils/api"
import {updateJwt} from "../slices/jwtSlice"

const loginThunk = createAsyncThunk("user/login", async (loginContract, {dispatch}) => {
    let response = await loginUserAPI(loginContract.username, loginContract.password)
    if(response.ok){
        let data = await response.json()
        dispatch(updateJwt(data.jwt))
        return data.user
    } else throw new Error(`Error: ${response.status}, ${response.statusText}`)
})

export default loginThunk