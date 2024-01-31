"use client";

import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { setCredential } from "../redux/reducer/reducer";
import { RotatingLines } from "react-loader-spinner";
import { useState } from "react";

interface FormData {
  mobile_number: string;
}

const Sendotp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch: any = useDispatch();

  const [disabled, setDisabled] = useState<Boolean>(false);

  const sendOtp: SubmitHandler<FormData> = async (data) => {
    const phoneNumber = "+91" + data.mobile_number;

    setDisabled(true);
    const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
      size: "invisible",
    });

    try {
      const confirmationResult: any = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );

      const data = {
        verificationId: confirmationResult.verificationId,
        phoneNumber: phoneNumber,
      };
      toast.success("Otp sended Successfully");
      setDisabled(false);
      dispatch(setCredential(data));
    } catch (error: any) {
      setDisabled(false);
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Otp Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>Enter a mobile number to send otp</p>
              </div>
            </div>

            <div className="mt-2">
              <div className="max-w-sm mx-auto">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Phone number:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 19 18"
                    >
                      <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="phone-input"
                    className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="9999999999"
                    maxLength={10}
                    {...register("mobile_number", {
                      required: "Mobile number is required",
                      minLength: {
                        value: 10,
                        message:
                          "Mobile number must be at least 10 digits long",
                      },
                      maxLength: {
                        value: 10,
                        message: "Mobile number must not exceed 10 digits",
                      },
                    })}
                  />
                </div>
                <div>
                  <small className="text-red-500 text-xs italic">
                    {errors?.mobile_number && errors.mobile_number.message}
                  </small>

                  <button
                    disabled={disabled as boolean}
                    onClick={handleSubmit(sendOtp)}
                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                  >
                    Send Otp{" "}
                    <RotatingLines
                      visible={disabled as boolean}
                      width="38"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sendotp;
