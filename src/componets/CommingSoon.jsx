"use client";

import { useState } from "react";

const ComingSoon = () => {
  console.log(process.env.MONGO_URI);
  
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We’ll contact you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen  bg-[#FFBFOO] flex flex-col justify-center items-center text-center px-4">
      {/* Header Text */}
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
        Coming Soon
        
        
      </h1>
      <p className="text-gray-600 max-w-xl mb-8">
        Our hotel booking platform is getting ready! Want to be notified or have a query? Drop us a message below.
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
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="message"
            placeholder="Your Message"
            required
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
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
