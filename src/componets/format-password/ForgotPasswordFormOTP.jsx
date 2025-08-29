// components/ForgotPasswordForm.js
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordFormOTP() {
  const [otp, setOtp] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Handle forgot password API call here
    console.log("Reset link sent to:", otp);
    alert(`If an account exists for ${otp}, a reset link has been sent.`);
  };

  return (
    <div className="flex text-black items-center mt-[-50px] justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">OTP</label>
            <input
              type="number"
              placeholder="Enter OTP "
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black border hover:text-white py-2 rounded-md hover:bg-black transition"
          >
            <Link href="/forgot-password2">
                Submit OTP
            </Link>
          </button>
        </form>

        
      </div>
    </div>
  );
}
