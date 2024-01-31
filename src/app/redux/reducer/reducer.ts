import { createSlice } from "@reduxjs/toolkit";

let sessionToken = null;
if (typeof window !== 'undefined') {
  sessionToken = localStorage.getItem('sessionToken');
}

const otpSlice = createSlice({
  name: "otpslice",
  initialState: {
    phoneNumber: "",
    verificationId: "",
    sessionToken: sessionToken,
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
