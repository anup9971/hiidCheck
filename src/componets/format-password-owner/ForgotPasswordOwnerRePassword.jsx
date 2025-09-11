// components/ForgotPasswordFormRePassword.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgotPasswordOwnerRePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("❌ Password and Confirm Password do not match");
      return;
    }
   let role = localStorage.getItem("resetRole")
    setLoading(true);
    try {
      const usernameOrEmail = localStorage.getItem("resetUser"); // 👈 step 1 se save kiya tha
      if (!usernameOrEmail) {
        alert("⚠️ Something went wrong. Please restart the process.");
        return;
      }
      

      const res = await fetch("/api/forgetpassword/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           role,
          username: usernameOrEmail,
          password,
        }),
      });

      const data = await res.json();

      if (data.result === "Done") {
         toast.success("Your password has been reset successfully!")
        localStorage.removeItem("resetUser"); // clean up
        router.push("/");
      } else {
        alert(`❌ Failed: ${data.reason}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex text-black items-center mt-[-50px] justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">New Password*</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Confirm Password*</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black border hover:text-white py-2 rounded-md hover:bg-black transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Confirm"}
          </button>
        </form>
      </div>
    </div>
  );
}
