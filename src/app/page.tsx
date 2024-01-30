"use client";
import React, { useEffect, useState } from "react";
import Sendotp from "./components/Sendotp";
import { useSelector } from "react-redux";
import Verifyotp from "./components/Verifyotp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PhoneAuth = () => {
  const state: any = useSelector((state) => state);
  const [otpflag, setOtpFlag] = useState<boolean>(false);

  useEffect(() => {
    if (state.otp.verificationId != "") {
      setOtpFlag(true);
    }
  }, [state])

  const reSendOtp = () => {
    setOtpFlag(false);
  }

  return (
    <>
      {(!otpflag) ? <Sendotp /> : <Verifyotp reSendOtp={reSendOtp} />}
      <div id="recaptcha"></div>
      <ToastContainer />
    </>
  );
};

export default PhoneAuth;
