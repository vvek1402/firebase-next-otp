import { createSlice } from "@reduxjs/toolkit";
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

const otpSlice = createSlice({
  name: "otpslice",
  initialState: {
    phoneNumber: "",
    verificationCode: "",
    verificationId: "",
  },
  reducers: {
    handleSendCode: (state, action) => {
      const phoneNumber = "+91" + action.payload;

      console.log(action.payload);

      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });

      try {
        const confirmationResult = signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptchaVerifier
        );

        confirmationResult.then((res) => {
          const data = res;
          toast.success("Otp sended Successfully");
          state.verificationId = data.verificationId;
          state.phoneNumber = phoneNumber;
        });
      } catch (error) {
        toast.error("Failed to send OTP, something went wrong");
        console.error(error);
      }
    },
    handleVerifyCode: (state) => {
      const credential = PhoneAuthProvider.credential(
        state.verificationId,
        state.verificationCode
      );

      try {
        const signin = signInWithCredential(auth, credential);

        signin.then(() => {
          toast.success("Otp verified, Login Successfull");
          console.log("Login Successfull");
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const { handleSendCode, handleVerifyCode } = otpSlice.actions;
export default otpSlice.reducer;
