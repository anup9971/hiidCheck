"use client";

import { useState } from "react";
import Formvalidators from "./Formvalidators";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ComingSoon = () => {
  let router = useRouter()
  const [form, setForm] = useState({ name: "", email: "", phone:"", message: "" });
let [show,setShow]=useState(false)
  const [errorMessage, setErrorMessage]= useState({
    name:"Name Field Is Required",
    phone:"Phone Field Is Required",
    email:"Email Field Is Required",
    
  })

  const handleChange = (e) => {
     let {name, value}= e.target;
      setErrorMessage((x)=>{
        return{
          ...x,
          [name]:Formvalidators(e)
        }
      })

      setForm((x)=>{
        return{
          ...x, [name]:value
        }
      })
  };

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      
       let error = Object.values(errorMessage).find((x)=>x !=="");
       if(error){
        setShow(true)
      
        return;
       }
       else{
        let response = await fetch("http://localhost:3000/api/commingsoon",{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form)
        })
        let data = await response.json()
        console.log(data);
        
       if (data.success) {
      toast.success("Query Submitted Successfully");
      console.log(data);
      
       // optional reset
       router.push("/")
    } else {
      alert("Internal Server Error");
    }
       }
        
    } catch (error) {
      //  console.log({error:"Internal Error.."});
       
    }
     
  };

  return (
    <div className="min-h-screen mt-[80px] bg-gray-50 md:bg-[#FFBFOO] flex flex-col justify-center items-center text-center px-4">
      {/* Header Text */}
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
         Curious About Launch Perks? 
        
        
      </h1>
      <p className="text-gray-600 max-w-xl mb-8">
       
Leave your details and unlock priority access before anyone else.
      </p>

      {/* Form Box */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white  p-6 rounded-lg shadow-xl"
      >
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
           
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-600 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
          />
          {show && errorMessage.name? <p className="text-red-600">{errorMessage.name}</p>:""}
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
           
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-600 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
          />
          {show && errorMessage.email? <p className="text-red-600">{errorMessage.email}</p>:""}

        </div>
          <div className="mb-4">
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            required
            
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-600 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
          />
          {show && errorMessage.phone? <p className="text-red-600">{errorMessage.name}</p>:""}

        </div>
        <div className="mb-4">
          <textarea
            name="message"
            placeholder="Your Message"
            
      
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 text-gray-600 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-[#5f8575] text-white py-2 rounded hover:bg-[#3d6d59] transition"
        >
          Send Message
        </button>
      </form>

      {/* Footer Note */}
       {/* <p className="text-sm text-gray-500 mt-6">© {new Date().getFullYear()} YourHotelName. All rights reserved.</p> */}
    </div>
  );
};

export default ComingSoon;
