// components/ForgotPasswordForm.js
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Handle forgot password API call here
    console.log("Reset link sent to:", email);
    alert(`If an account exists for ${email}, a reset link has been sent.`);
  };

  return (
    <div className="flex text-black items-center mt-[-50px] justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black border hover:text-white py-2 rounded-md hover:bg-black transition"
          >
            <Link href="/forgot-password1">
                 Send OTP
            </Link>
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Remember your password?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
