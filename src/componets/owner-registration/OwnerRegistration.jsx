// components/RegisterForm.js
"use client";

import { useState } from "react";
import Link from "next/link";
import FormValidator from "../FormValidator";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function OwnerRegistration() {
  let [regData,setRegData]= useState({
    name:"", email:"", username:"", phone:"", password:"", PropertyGST:"",propertyName:""
  })
let router = useRouter()

  let [show,setShow]= useState(false)
  let [errorMessage, setErrorMessage]= useState({
    name:"Name Field Is Required",
    email:"Email Field Is Required",
    phone:"Phone Field Is Required",
    password :"Password Field Is Required",
    username:"Username Field Is Required",
    PropertyGST:"Property GST Field Is Required",
    propertyName:"property Name Field Is Required",

  })


  const handleInputData = (e) => {
     let {name , value }= e.target;
     setErrorMessage((x)=>{
            return{
              ...x,
              [name]:FormValidator(e)
            }
     })
     setRegData((y)=>{
  return{
    ...y, 
    [name]:value

  }
})
  };



const handlepostData = async (e) => {
  e.preventDefault();
  try {
    let error = Object.values(errorMessage).find((a) => a !== "");
    if (error) {
      setShow(true);
      console.log(error);
      return;
    }

    let res = await fetch("http://localhost:8000/api/owner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regData),
    });

    // parse backend JSON response
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || `Failed: ${res.status}`);
    }
    console.log("✅ Server Response:", result);
    // example: save token in localStorage
    localStorage.setItem("token", result.token);
    toast.success("Registration successfully!")
    router.push("/login")
  } catch (error) {
    console.error("❌ Error in handlepostData:", error);
  }
};



  return (
    <div className="flex text-black items-center md:pt-20 mt-[-10px] pb-15 justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form  onSubmit={handlepostData} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              placeholder="full Name"
             
                onChange={handleInputData}        
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {show && errorMessage.name?<p className="text-red-500 text-sm uppercase ">{errorMessage.name}</p>:""}
          </div>

          <div>
            <label className="block mb-1 font-medium">UserName <span className="text-red-500">*</span></label>
            <input
              name="username"
              type="text"
              placeholder="username"
              
              onChange={handleInputData}          
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {show && errorMessage.username?<p className="text-red-500 text-sm uppercase ">{errorMessage.username}</p>:""}

          </div>
          <div>
            <label className="block mb-1 font-medium">Email <span className="text-red-500">*</span></label>
            <input
              name="email"
              type="email"
              placeholder="email"
           
                onChange={handleInputData}      
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {show && errorMessage.email?<p className="text-red-500 text-sm uppercase ">{errorMessage.email}</p>:""}

          </div>
           <div>
            <label className="block mb-1 font-medium">Phone <span className="text-red-500">*</span></label>
            <input
              type="number"
              placeholder="phone"
              name="phone"
           
                onChange={handleInputData}        
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {show && errorMessage.phone?<p className="text-red-500 text-sm uppercase ">{errorMessage.phone}</p>:""}

          </div>

           <div>
            <label className="block mb-1 font-medium">Your Property Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Your Property Name *"
              name="propertyName"
           
                onChange={handleInputData}        
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {show && errorMessage.propertyName?<p className="text-red-500 text-sm uppercase ">{errorMessage.propertyName}</p>:""}

          </div>

           <div>
            <label className="block mb-1 font-medium">Property GST Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Property GST Number*"
              name="PropertyGST"
           
                onChange={handleInputData}        
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {show && errorMessage.PropertyGST?<p className="text-red-500 text-sm uppercase ">{errorMessage.PropertyGST}</p>:""}

          </div>
          <div>
            <label className="block mb-1 font-medium">Password <span className="text-red-500">*</span> </label>
            <input
              placeholder="password"
              type="password"
              name="password"
              
                onChange={handleInputData}        
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {show && errorMessage.password?<p className="text-red-500 text-sm uppercase ">{errorMessage.password}</p>:""}

          </div>
          {/* <div>
            <label className="block mb-1 font-medium">Confirm Password*</label>
            <input
              placeholder="Confirm Password"
               name="" 
              type="password"
              value={confirmPassword}
                onChange={handleInputData}        
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-white text-black border  hover:text-white py-2 rounded-md hover:bg-black transition"
          >
           Owner Register
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
