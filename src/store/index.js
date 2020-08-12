import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import jwtReducer from "./slices/jwtSlice"
import courseReducer from "./slices/courseList"
import courseOutLineReducer from "./slices/courseOutlineList"
import {composeWithDevTools} from "redux-devtools-extension"

const store = configureStore({
    reducer : {
        user : userReducer,
        jwt : jwtReducer,
        courses : courseReducer,
        courseOutlines : courseOutLineReducer
    },
    devTools : true
})

export default store