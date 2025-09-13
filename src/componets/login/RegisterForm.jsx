// components/RegisterForm.js


// import { useState } from "react";
// import Link from "next/link";
// import FormValidator from "../FormValidator";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";



// export default function RegisterForm() {
//   let [regData,setRegData]= useState({
//     name:"", email:"", username:"", phone:"", password:"",pic:""
//   })
// let router = useRouter()

//   let [show,setShow]= useState(false)
//   let [errorMessage, setErrorMessage]= useState({
//     name:"Name Field Is Required",
//     email:"Email Field Is Required",
//     phone:"Phone Field Is Required",
//     password :"Password Field Is Required",
//     username:"Username Field Is Required"
//   })


//   const handleInputData = (e) => {
//      let {name , value }= e.target;
//      setErrorMessage((x)=>{
//             return{
//               ...x,
//               [name]:FormValidator(e)
//             }
//      })
//      setRegData((y)=>{
//   return{
//     ...y, 
//     [name]:value

//   }
// })
//   };



// const handlepostData = async (e) => {
//   e.preventDefault();
//   try {
//     let error = Object.values(errorMessage).find((a) => a !== "");
//     if (error) {
//       setShow(true);
//       console.log(error);
//       return;
//     }

//     let res = await fetch("/api/user", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(regData),
//     });

//     // parse backend JSON response
//     const result = await res.json();

//     if (!res.ok) {
//       throw new Error(result.message || `Failed: ${res.status}`);
//     }
//     console.log("✅ Server Response:", result);
//     // example: save token in localStorage
//     localStorage.setItem("token", result.token);
//     toast.success("Registration successfully!")
//     router.push("/userlogin")
//   } catch (error) {
//     console.error("❌ Error in handlepostData:", error);
//   }
// };



//   return (
//     <div className="flex text-black items-center md:pt-20 mt-[-10px] pb-15 justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
//         <form  onSubmit={handlepostData} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium">Full Name*</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="full Name"
             
//                 onChange={handleInputData}        
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {show && errorMessage.name?<p className="text-red-500 text-sm uppercase ">{errorMessage.name}</p>:""}
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">UserName*</label>
//             <input
//               name="username"
//               type="text"
//               placeholder="username"
              
//               onChange={handleInputData}          
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {show && errorMessage.username?<p className="text-red-500 text-sm uppercase ">{errorMessage.username}</p>:""}

//           </div>


//             <div>
//             <label className="block mb-1 font-medium">User Image*</label>
//             <input
//               name="pic"
//               type="file"
//               placeholder="Imgae"
              
//               onChange={handleInputData}          
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {show && errorMessage.username?<p className="text-red-500 text-sm uppercase ">{errorMessage.username}</p>:""}

//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Email*</label>
//             <input
//               name="email"
//               type="email"
//               placeholder="email"
           
//                 onChange={handleInputData}      
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {show && errorMessage.email?<p className="text-red-500 text-sm uppercase ">{errorMessage.email}</p>:""}

//           </div>
//            <div>
//             <label className="block mb-1 font-medium">Phone</label>
//             <input
//               type="number"
//               placeholder="phone"
//               name="phone"
           
//                 onChange={handleInputData}        
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {show && errorMessage.phone?<p className="text-red-500 text-sm uppercase ">{errorMessage.phone}</p>:""}

//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Password*</label>
//             <input
//               placeholder="password"
//               type="password"
//               name="password"
              
//                 onChange={handleInputData}        
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {show && errorMessage.password?<p className="text-red-500 text-sm uppercase ">{errorMessage.password}</p>:""}

//           </div>
//           {/* <div>
//             <label className="block mb-1 font-medium">Confirm Password*</label>
//             <input
//               placeholder="Confirm Password"
//                name="" 
//               type="password"
//               value={confirmPassword}
//                 onChange={handleInputData}        
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div> */}
//           <button
//             type="submit"
//             className="w-full bg-white text-black border  hover:text-white py-2 rounded-md hover:bg-black transition"
//           >
//             Register
//           </button>
//         </form>

//         <div className="mt-4 text-center text-sm">
//           Already have an account?{" "}
//           <Link href="/userlogin" className="text-blue-600 hover:underline">
//             Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import FormValidator from "../FormValidator"; // assuming you have this

export default function RegisterForm() {
  const router = useRouter();

  const [regData, setRegData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    pic: null,
  });

  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "Name Field Is Required",
    username: "Username Field Is Required",
    email: "Email Field Is Required",
    phone: "Phone Field Is Required",
    password: "Password Field Is Required",
  });

  const handleInputData = (e) => {
    const { name, value, files } = e.target;

    if (name === "pic") {
      setRegData((prev) => ({ ...prev, pic: files[0] }));
    } else {
      setRegData((prev) => ({ ...prev, [name]: value }));
    }

    setErrorMessage((prev) => ({ ...prev, [name]: FormValidator(e) }));
  };

  const handlepostData = async (e) => {
    e.preventDefault();

    try {
      const error = Object.values(errorMessage).find((a) => a !== "");
      if (error) {
        setShow(true);
        console.log(error);
        return;
      }

      const formData = new FormData();
      formData.append("name", regData.name);
      formData.append("username", regData.username);
      formData.append("email", regData.email);
      formData.append("phone", regData.phone);
      formData.append("password", regData.password);
      if (regData.pic) formData.append("pic", regData.pic);

      const res = await fetch("/api/user", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || `Failed: ${res.status}`);

      console.log("✅ Server Response:", result);
      localStorage.setItem("token", result.token);
      toast.success("Registration successful!");
      router.push("/userlogin");
    } catch (error) {
      console.error("❌ Error in handlepostData:", error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handlepostData} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name*</label>
            <input
              type="text"
              name="name"
              value={regData.name}
              onChange={handleInputData}
              placeholder="Enter your full name"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            {show && errorMessage.name && <p className="text-red-500 text-sm">{errorMessage.name}</p>}
          </div>

          {/* Username */}
          <div>
            <label className="block mb-1 font-medium">Username*</label>
            <input
              type="text"
              name="username"
              value={regData.username}
              onChange={handleInputData}
              placeholder="Choose a username"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            {show && errorMessage.username && <p className="text-red-500 text-sm">{errorMessage.username}</p>}
          </div>

          {/* Profile Image */}
          <div>
            <label className="block mb-1 font-medium">Profile Image</label>
            <input
              type="file"
              name="pic"
              accept="image/*"
              onChange={handleInputData}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            {regData.pic && (
              <img
                src={URL.createObjectURL(regData.pic)}
                alt="Preview"
                className="mt-2 w-24 h-24 rounded-full border"
              />
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email*</label>
            <input
              type="email"
              name="email"
              value={regData.email}
              onChange={handleInputData}
              placeholder="Enter your email"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            {show && errorMessage.email && <p className="text-red-500 text-sm">{errorMessage.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={regData.phone}
              onChange={handleInputData}
              placeholder="Enter your phone number"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            {show && errorMessage.phone && <p className="text-red-500 text-sm">{errorMessage.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password*</label>
            <input
              type="password"
              name="password"
              value={regData.password}
              onChange={handleInputData}
              placeholder="Enter a secure password"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            {show && errorMessage.password && <p className="text-red-500 text-sm">{errorMessage.password}</p>}
          </div>

          <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Register
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/userlogin" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
