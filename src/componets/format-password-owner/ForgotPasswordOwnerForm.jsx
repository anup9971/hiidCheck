"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserCog, User } from "lucide-react"; // icons

export default function ForgotPasswordOwnerForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [role, setRole] = useState("Owner"); // default Owner
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  let router = useRouter();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
     localStorage.setItem("resetRole", role);
    try {
      const res = await fetch("/api/forgetpassword/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          username: usernameOrEmail,
        }),
      });

      const data = await res.json();
      if (data.result === "Done") {
        localStorage.setItem("resetUser", usernameOrEmail);
        toast.success("OTP has been sent to your registered email.");
        router.push("/forgot-password-owner1"); // ✅ fixed path
      } else {
        toast.error(`❌ Failed: ${data.reason}`);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("⚠️ Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex text-black items-center mt-[-50px] justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          {/* Role Toggle */}
          {/* <div className="flex items-center justify-between p-2 rounded-lg">
            <div
              onClick={() => setRole(role === "Owner" ? "Admin" : "Owner")}
              className="flex items-center gap-2 cursor-pointer bg-gray-200 rounded-full px-3 py-1 transition"
            >
              {role === "Owner" ? (
                <>
                  <User size={18} className="text-blue-600" />
                  <span className="text-sm">Owner</span>
                </>
              ) : (
                <>
                  <UserCog size={18} className="text-red-600" />
                  <span className="text-sm">Admin</span>
                </>
              )}
            </div>
          </div> */}

          {/* Username / Email */}
          <div>
            <label className="block mb-1 font-medium">Email or Username</label>
            <input
              type="text"
              placeholder="Enter email or username"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Agree Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="cursor-pointer"
            />
            <label htmlFor="agree" className="text-sm cursor-pointer">
              I agree to receive OTP on my registered email
            </label>
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            disabled={loading || !agree}
            className="w-full bg-white text-black border hover:text-white py-2 rounded-md hover:bg-black transition disabled:opacity-50"
          >
            {loading ? "Sending..." : `Send OTP as ${role}`}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Remember your password?{" "}
          <Link href="/login-owner" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
