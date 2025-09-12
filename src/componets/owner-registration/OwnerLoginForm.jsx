

"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import FormValidator from "../FormValidator"; // ✅ custom validator

export default function OwnerLoginForm({ roleType = "owner" }) {
  const router = useRouter();

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [showErrors, setShowErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    username: "Username Field Is Required",
    password: "Password Field Is Required",
  });

  // ✅ Input Handler
  const handleInputData = (e) => {
    const { name, value } = e.target;

    setErrorMessage((prev) => ({
      ...prev,
      [name]: FormValidator(e, loginData),
    }));

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle Login
 // ✅ Handle Login
const handleLogin = async (e) => {
  e.preventDefault();
  setShowErrors(true);

  if (errorMessage.username || errorMessage.password) return;

  try {
    const apiUrl =
      roleType === "admin" ? "/api/owner/login" : "/api/owner/login";

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.reason || "Login failed");
    }

    const result = await res.json();
    

//    if (result.result === "Done") {
//   localStorage.setItem("token", result.token);
//   localStorage.setItem("login", true);
//   localStorage.setItem("role", result.data?.role);
//   localStorage.setItem("name", result.data?.name);

//   Cookies.set("role", result.data?.role, { path: "/" });

//   toast.success("Login successful!");

//   // ✅ Redirect based on role
//   setTimeout(() => {
//     switch (result.data?.role) {
//       case "Owner":
//         router.push("/owner-profile");
//         break;
//       case "Admin":
//         router.push("/admin/dashboard");
//         break;
//       default:
//         router.push("/");
//     }

//     // ✅ Refresh after redirect
//     setTimeout(() => {
//       window.location.reload();
//     }, 500);
//   }, 500);
// } else {
//   toast.error(result.reason || "Invalid username or password");
// }

if (result.result === "Done") {
  localStorage.setItem("token", result.token);
  localStorage.setItem("login", true);
  localStorage.setItem("role", result.data?.role);
  localStorage.setItem("name", result.data?.name);

  Cookies.set("role", result.data?.role, { path: "/" });

  toast.success("Login successful!");

  // ✅ Redirect & refresh together
  setTimeout(() => {
    switch (result.data?.role) {
      case "Owner":
        window.location.href = "/owner-profile";
        break;
      case "Admin":
        window.location.href = "/admin/dashboard";
        break;
      default:
        window.location.href = "/";
    }
  }, 800); // thoda delay taaki toast dikhe
} else {
  toast.error(result.reason || "Invalid username or password");
}


  } catch (error) {
    console.error("Login error:", error);
    toast.error(error.message || "Something went wrong!");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {roleType === "admin" ? "Admin Login" : "Owner Login"}
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block mb-1 font-medium">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username..."
              value={loginData.username}
              onChange={handleInputData}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showErrors && errorMessage.username && (
              <p className="text-red-500 uppercase text-sm">
                {errorMessage.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password..."
              value={loginData.password}
              onChange={handleInputData}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showErrors && errorMessage.password && (
              <p className="text-red-500 uppercase text-sm">
                {errorMessage.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-md hover:bg-black border hover:text-white transition"
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm">
          <Link
            href="/format-password-owner"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>

          <Link
            href="/registration-owner"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

