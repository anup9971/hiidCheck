"use client"

import React, { useState } from 'react'
import Formvalidators from '../Formvalidators copy'

export default function FromData() {
let [data, setData]=useState({
    name:"",email:"", phone:"",message:""
})
let [show, setShow] = useState(false)
let [errorMessage, setErrorMessage]= useState({
    name:"Name Field Is Required",
    phone:"Phone Field Is Required",
    email:"Email Field Is Required",

})
 const inputHandler =(e)=>{
    let {name, value}= e.target;
    setErrorMessage((x)=>{
        return {
            ...x ,
            [name]:Formvalidators(e)
        }
    })
    setData((x)=>{
        return{
            ...x,
            [name]:value
        }
    })
 }

const postDataHandler = async (e) => {
  e.preventDefault();
  try {
    // check for errors
    const error = Object.values(errorMessage).find((x) => x !== "");
    if (error) {
      setShow(true);
      console.log("Validation Error:", error);
      return; // stop execution
    }

    const res = await fetch("http://localhost:8000/api/contactus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Failed: ${res.status}`);
    }

    const result = await res.json();
    console.log("Server Response:", result);

  } catch (err) {
    console.error("PostData Error:", err);
  }
};


  return (
    <>
      <form onSubmit={postDataHandler} className="lg:col-span-2 space-y-6 bg-white p-6 rounded-lg shadow">
  <h2 className="text-2xl font-semibold mb-4">Guest Information</h2>

  {/* Name Field */}
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
      Name*
    </label>
    <input
      type="text"
      id="name"
      name="name"
      onChange={inputHandler}
      placeholder="Name"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2"
      
    />
    {show && errorMessage.name ?<p className=' uppercase text-red-500'>{errorMessage.name}</p>:""}
  </div>

  {/* Email Field */}
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      Email*
    </label>
    <input
      type="email"
      onChange={inputHandler}
      id="email"
      name="email"
      placeholder="example@gmail.com"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2"
   
    />
    {show && errorMessage.email ?<p className='uppercase text-red-500'>{errorMessage.email}</p>:""}
  </div>

  {/* Phone Field */}
  <div>
    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
      Phone*
    </label>
    <input
      type="tel"
      id="phone"
      onChange={inputHandler}
      name="phone"
      placeholder="+91 98345 67890"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2"

    />
    {show && errorMessage.phone ?<p className= 'text-red-500 uppercase'>{errorMessage.phone}</p>:""}
  </div>

  {/* Address Field */}
  <div>
    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
      Address
    </label>
    <textarea
      id="address"
      name="message"
      placeholder="123 Main St, City, Delhi"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2"
      rows={3}
      onChange={inputHandler}

    />
  </div>

  <button type='submit' className="w-full bg-white border text-black hover:bg-black hover:text-white py-3 rounded text-lg">
    Book Now
  </button>
              </form>
    </>
  )
}
