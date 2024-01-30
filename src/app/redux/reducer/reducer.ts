import { createSlice } from "@reduxjs/toolkit";

const otpSlice = createSlice({
  name: "otpslice",
  initialState: {
    phoneNumber: "",
    verificationId: "",
    sessionToken: localStorage.getItem("sessionToken"),
  },
  reducers: {
    setCredential: (state, action) => {
      state.verificationId = action.payload.verificationId;
      state.phoneNumber = action.payload.phoneNumber;
    },
    setSession: (state, action) => {
      state.sessionToken = action.payload;
      localStorage.setItem("sessionToken", action.payload)
    },
  },
});

export const { setCredential, setSession } = otpSlice.actions;
export default otpSlice.reducer;
