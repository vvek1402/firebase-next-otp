import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "../reducer/reducer";

const store  = configureStore({
    reducer : {
        otp : otpReducer,
    }
})

export default store;