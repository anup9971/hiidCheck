"use client";

import { useEffect, useState } from "react";
import AdminProfileSideBar from "../admin/admin-dasboard/AdminProfileSideBar";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";




export default function AdminUpdateProfile() {
        let {id} = useParams() 
        let router =useRouter()
        const [loading, setLoading] = useState(false);
        const [formData, setFormData] = useState({
          name: "",
          email: "",
          phone: "",
          address: "",
          pic: null,
        });
        const [owner, setOwner] = useState(null)
        const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
          }

        useEffect(() => {
          const fetchOwner = async () => {
            try {
              const res = await fetch(`/api/owner/${id}`);
              const data = await res.json();
               if (data && data._id) {
                 setOwner(data)
                  setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    address: data.address || "",
                    pic: null,
                  });
               }
               
            } catch (err) {
               console.error("❌ Failed to fetch user:", err.message);

            }
          };
          if (id) fetchOwner();
        }, [id]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pic") {
      setFormData({ ...formData, pic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("address", formData.address);

      if (formData.pic) form.append("pic", formData.pic);

      const res = await fetch(`/api/owner/${id}`, {
        method: "PUT",
        body: form,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Update failed");

      toast.success("Profile updated successfully!");
      setOwner(result); // API से updated owner वापस लो
      setFormData({ ...formData, pic: null }); // reset pic
      router.push("/admin/dashboard"); // redirect
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
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
               <AdminProfileSideBar owner={owner} formatDate={formatDate} />
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
              name="pic"
              accept="image/*"
              onChange={handleChange}
              className="w-full mt-1 rounded-lg  px-3  py-2 border" 
            />
          </div>

          {/* City */}
          {/* <div>
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
          </div> */}

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
