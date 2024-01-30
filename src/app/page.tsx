"use client";
import React, { useEffect, useState } from "react";
import Sendotp from "./components/Sendotp";
import { useSelector } from "react-redux";
import Verifyotp from "./components/Verifyotp";

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
    </>
  );
};

export default PhoneAuth;
