"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { validateFormData } from "../FormValidator";

export default function ForgotPasswordFormRePassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live field validation
    const fieldErrors = validateFormData({ ...formData, [name]: value });
    setErrors(fieldErrors);
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // validate full form before submit
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const usernameOrEmail = localStorage.getItem("resetUser");
      if (!usernameOrEmail) {
        alert("⚠️ Something went wrong. Please restart the process.");
        return;
      }

      const res = await fetch("/api/forgetpassword/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "User", // or "Admin" | "Owner"
          username: usernameOrEmail,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (data.result === "Done") {
        toast.success("Your password has been reset successfully!");
        localStorage.removeItem("resetUser");
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Confirm Password*</label>
            <input
              type="password"
              placeholder="Confirm new password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
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
