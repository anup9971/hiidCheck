"use client";

import { useState } from "react";
import AdminProfileSideBar from "../admin/admin-dasboard/AdminProfileSideBar";



export default function AdminUpdateProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    alert("Profile updated successfully!");
  };
  const user = {
    name: "Ankit Kumar",
    email: "ankit@example.com",
    phone: "+91 98765 6335",
    avatar: "https://i.pravatar.cc/150?img=12",
    memberSince: "Jan 2023",
  };
  return (
   <>
     <div className="min-h-screen bg-gray-50  mt-[-4px] pt-20 pb-25 text-black p-4 md:p-8">
         <div className="max-w-6xl mx-auto">
           {/* Header */}
           <div className="flex items-center justify-between mb-6">
             <h1 className="text-2xl md:text-3xl font-semibold">Admin Dashboard</h1>
           </div>
   
           {/* Layout */}
           <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
             {/* Sidebar */}
               <AdminProfileSideBar user={user} />
             {/* Main Content */}
             <div className="col-span-3 bg-white shadow rounded-lg p-6 md:p-8">
               <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  Update Profile
               </h2>
       

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full mt-1 rounded-lg  px-3  py-2 border" 
            />
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="mt-3 w-24 h-24 object-cover  rounded-full border"
              />
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              rows="3"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
           </div>
         </div>
       </div>



   
   </>
  );
}
