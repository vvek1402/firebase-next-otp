"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Welcome() {
  const state: any = useSelector((state) => state);

  const router = useRouter();
  useEffect(() => {
    if (state.otp.sessionToken == null) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">
      <a
        href="#"
        className="inline-block mb-6 text-3xl font-bold tracking-wider uppercase text-primary-dark dark:text-light"
      >
        Firebase Otp
      </a>
      <h1>Welcome To the dashboard, your otp verified Successfully</h1>
    </div>
  );
}

export default Welcome;
