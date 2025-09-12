"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FormValidator from "../FormValidator";

export default function ForgotPasswordOwnerRePassword() {
  let [data, setData] = useState({
    confirmPassword: "",
    password: "",
  });

  let [errorMessage, setErrorMessage] = useState({});
  let [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function getInputData(e) {
    const { name, value } = e.target;

    setData((old) => ({
      ...old,
      [name]: value,
    }));

    setErrorMessage((old) => ({
      ...old,
      [name]: FormValidator(e, { ...data, [name]: value }),
    }));
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setShow(true);

    // ✅ Validate all fields before submit
    let errors = {
      password: FormValidator({ target: { name: "password", value: data.password } }, data),
      confirmPassword: FormValidator({ target: { name: "confirmPassword", value: data.confirmPassword } }, data),
    };

    setErrorMessage(errors);

    // अगर कोई भी error है तो stop करो
    if (errors.password || errors.confirmPassword) {
      toast.error("⚠️ Please fix the errors before submitting.");
      return;
    }

    let role = localStorage.getItem("resetRole");
    setLoading(true);
    try {
      const usernameOrEmail = localStorage.getItem("resetUser");
      if (!usernameOrEmail) {
        toast.error("⚠️ Something went wrong. Please restart the process.");
        return;
      }

      const res = await fetch("/api/forgetpassword/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          username: usernameOrEmail,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (result.result === "Done") {
        localStorage.removeItem("resetUser");
        toast.success(" Your password has been reset successfully!");
        router.push("/");
      } else {
        toast.error(`❌ Failed: ${result.reason}`);
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
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">New Password*</label>
            <input
              type="password"
              placeholder="Enter new password"
              name="password"
              value={data.password}
              onChange={getInputData}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {show && errorMessage.password && (
              <p className="text-red-500 text-sm">{errorMessage.password}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirm Password*</label>
            <input
              type="password"
              placeholder="Confirm new password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={getInputData}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {show && errorMessage.confirmPassword && (
              <p className="text-red-500 text-sm">{errorMessage.confirmPassword}</p>
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
