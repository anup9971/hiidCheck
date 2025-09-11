
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import FormValidator from "../FormValidator";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export default function OwnerLoginForm() {
//   let router = useRouter()
//  let [loginData, setLoginData]= useState({
//   username:"", password:""
//  })
//  let [show,setShow]=useState(false)
//  let[errorMessage, setErrorMessage]= useState({
//   username:"Username Field Is Required", password:"Password Field Is Required"
//  })

//  const handleInputData = (e)=>{
//     let {name, value}= e.target;
//     setErrorMessage((y)=>{
//       return{
//         ...y, [name]:FormValidator(e)
//       }
//     })

//     setLoginData((x)=>{
//       return {
//         ...x, [name]:value
//       }
//     })
//  }


// const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:8000/api/owner/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json", 
//         },
//         body: JSON.stringify(loginData),
//       });

//       const result = await res.json();
//       console.log("API Response:", result);

//       if (result.result == "Done") {
//         // ✅ save token and role
//         localStorage.setItem("token", result.token);
//         localStorage.setItem("login", true);
//         localStorage.setItem("role", result.data?.role);
//         localStorage.setItem("name", result.data?.name);
//         localStorage.setItem("PropertyGST", result.data?.PropertyGST);
//         localStorage.setItem("propertyName", result.data?.propertyName);


//         toast.success("Login successful!");
      
//         if (result.data?.role === "Owner") {
//           router.push("/owner-profile");
//         } else {
//           router.push("/user-profile");

//         }
//       } else {
//         toast.error(result.reason || "Invalid username or password");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("Something went wrong!");
//     }
//   };
//   return (
//     <div className="flex items-center mt-[-80px] md:mt-0 text-black justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Owner Login</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium">Username <span className="text-red-500">*</span></label>
//             <input
//               type="text"
//               placeholder=" username...."
//                name="username"
//               onChange={handleInputData}
         
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {show && errorMessage.username ?<p className="text-red-500 uppercase text-sm">{errorMessage.username}</p>:""}

//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Password <span className="text-red-500">*</span></label>
//             <input
//               type="password"
//               placeholder="Password....."
//               name="password"
//               onChange={handleInputData}
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {show && errorMessage.password ?<p className="text-red-500 uppercase text-sm">{errorMessage.password}</p>:""}
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-white text-black py-2 rounded-md hover:bg-black border hover:text-white transition"
//           >
//             Login
//           </button>
//         </form>

//         <div className="flex justify-between mt-4 text-sm">
//           <Link href="/forgot-password" className="text-blue-600 hover:underline">
//             Forgot Password?
//           </Link>
//           <Link href="/owner-registration" className="text-blue-600 hover:underline">
//             Register
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



// components/OwnerLoginForm.js
// components/OwnerLoginForm.js
"use client";



import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import FormValidator from "../FormValidator";

export default function OwnerLoginForm({ roleType = "owner" }) {
  const router = useRouter();

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [showErrors, setShowErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    username: "Username Field Is Required",
    password: "Password Field Is Required",
  });

  // API URLs
  const apiUrls = {
    owner: "/api/owner/login",
  };

  const handleInputData = (e) => {
    const { name, value } = e.target;

    setErrorMessage((prev) => ({
      ...prev,
      [name]: FormValidator(e),
    }));

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowErrors(true);

    if (!loginData.username || !loginData.password) return;

    try {
      const res = await fetch(apiUrls[roleType], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.reason || "Login failed");
      }

      const result = await res.json();
      console.log("Owner API Response:", result);

      if (result.result === "Done") {
        localStorage.setItem("token", result.token);
        localStorage.setItem("login", true);
        localStorage.setItem("role", result.data?.role);
        localStorage.setItem("name", result.data?.name);

        Cookies.set("role", result.data?.role, { path: "/" });
        console.log("Owner Role in middleware:", result.data?.role);

        toast.success("Login successful!");

        switch (result.data?.role) {
          case "Owner":
            router.push("/owner-profile");
            break;
          case "admin":
            router.push("/admin-profile");
            break;
        
        }
      } else {
        toast.error(result.reason || "Invalid username or password");
      }
    } catch (error) {
      console.error("Owner login error:", error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Owner Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
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
              <p className="text-red-500 uppercase text-sm">{errorMessage.username}</p>
            )}
          </div>

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
              <p className="text-red-500 uppercase text-sm">{errorMessage.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-md hover:bg-black border hover:text-white transition"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
          <Link href="/owner-registration" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
