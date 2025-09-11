"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgotPasswordOwnerOTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const usernameOrEmail = localStorage.getItem("resetUser");
      const role = localStorage.getItem("resetRole");
     
       
      if (!usernameOrEmail || !role) {
        toast.error("⚠️ Something went wrong. Please restart the process.");
        return;
      }

      const res = await fetch("/api/forgetpassword/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, username: usernameOrEmail, otp }),
      });

      const data = await res.json();
      console.log(data, "forget-data");
      
      if (data.result === "Done") {
        toast.success("OTP verified successfully!");
        router.push("/forgot-password-owner2");
      } else {
        
        toast.error(`❌ Failed: ${data.reason}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">OTP</label>
            <input
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Submit OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
