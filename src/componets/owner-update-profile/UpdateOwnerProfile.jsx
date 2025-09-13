"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import OwnerProfileSideBar from "../ownerProfileDashboard/OwnerProfileSideBar";

export default function OwnerProfileUpdate() {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyName: "",
    PropertyGST: "",
    address: "",
    pic: null,
  });

  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Owner Data
  useEffect(() => {
    const fetchOwner = async () => {
      if (!id) return;
      try {
        const res = await fetch(`/api/owner/${id}`);
        const data = await res.json();

        if (data && data._id) {
          setOwner(data);
          setFormData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            propertyName: data.propertyName || "",
            PropertyGST: data.PropertyGST || "",
            address: data.address || "",
            pic: null,
          });
        }
      } catch (err) {
        console.error("❌ Failed to fetch user:", err.message);
      }
    };

    fetchOwner();
  }, [id]);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pic") {
      setFormData({ ...formData, pic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("phone", formData.phone);
      form.append("propertyName", formData.propertyName);
      form.append("PropertyGST", formData.PropertyGST);
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
      router.push("/"); // redirect
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-[-4px] text-black bg-gray-50 pt-16 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-2 order-1 lg:order-1">
          <p className="pb-5 font-bold text-3xl">Owner Profile</p>
          <OwnerProfileSideBar owner={owner} />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-4 order-2 lg:order-2">
          <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
              Update Owner Profile
            </h1>

            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>

              {/* Username */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  disabled
                  value={owner?.username || ""}
                  className="p-3 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  disabled
                  value={formData.email}
                  className="p-3 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>

              {/* Property Name */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1">
                  Property Name
                </label>
                <input
                  type="text"
                  name="propertyName"
                  value={formData.propertyName}
                  onChange={handleInputChange}
                  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>

              {/* Property GST */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1">
                  Property GST
                </label>
                <input
                  type="text"
                  name="PropertyGST"
                  value={formData.PropertyGST}
                  onChange={handleInputChange}
                  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>

              {/* Profile Picture */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1">
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="pic"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 w-full bg-[#5f8575] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#3b8d6b] transition disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
