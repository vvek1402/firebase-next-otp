"use client";
import { useDispatch, useSelector } from "react-redux";
import { handleVerifyCode } from "../redux/reducer/reducer";
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  otp: string;
}

const Verifyotp = (props : any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const state : any = useSelector(state => state);
  const dispatch : any = useDispatch();

  const verfiyOtp: SubmitHandler<FormData> = (data) => {
    const otpData : any = data;
    // dispatch(handleVerifyCode(otpData.otp));
  }

  const reSendOtpHandler = () => {
    props.reSendOtp();
  }

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your mobile number { state.otp.phoneNumber }</p>
              </div>
            </div>
            <div className="mt-2">
              <div className="max-w-sm mx-auto">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Enter OTP:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="otp-input"
                    className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="123456"
                    maxLength={6}
                    {...register("otp", {
                      required: "otp is required",
                      minLength: {
                        value: 6,
                        message: "opt must be at least 6 digits long",
                      },
                      maxLength: {
                        value: 6,
                        message: "opt must not exceed 6 digits",
                      },
                    })}
                  />
                  <small className="text-red-500 text-xs italic">
                  {errors?.otp && errors.otp.message}
                </small>
                </div>
                <div className="flex flex-col space-y-5">
                  <div>
                    <button onClick={handleSubmit(verfiyOtp)} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didnt recieve code?</p>{" "}
                    <button
                    onClick={() => reSendOtpHandler()}
                      className="flex flex-row items-center text-blue-600"
                    >
                      Resend
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verifyotp;
