"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OwnerProfileUpdate({ ownerId }) {
  const [owner, setOwner] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    PropertyGST: "",
    propertyName: "",
    city: "",
    address: "",
  });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "Name Field Is Required",
    email: "Email Field Is Required",
    phone: "Phone Field Is Required",
    password: "Password Field Is Required",
    username: "Username Field Is Required",
    PropertyGST: "Property GST Field Is Required",
    propertyName: "Property Name Field Is Required",
    city: "City Field Is Required",
    address: "Address Field Is Required",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/owner/${ownerId}`);
        const data = await res.json();
        setOwner(data);
      } catch (err) {
        console.error("Error fetching owner data:", err);
      }
    };
    if (ownerId) fetchOwner();
  }, [ownerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setErrorMessage((prev) => ({
      ...prev,
      [name]: value.trim() === "" ? `${name} is required` : "",
    }));

    setOwner((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
      return alert("update succeefully")

    const hasError = Object.values(errorMessage).some((msg) => msg !== "");
    if (hasError) {
      setShowError(true);
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/owner/${ownerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(owner),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Update failed");
      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-white to-green-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-2xl rounded-3xl max-w-3xl w-full p-8 md:p-12">
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
              value={owner.name}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {showError && errorMessage.name && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.name}</p>
            )}
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={owner.username}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {showError && errorMessage.username && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={owner.email}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {showError && errorMessage.email && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={owner.phone}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {showError && errorMessage.phone && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.phone}</p>
            )}
          </div>

          {/* Property Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">
              Property Name
            </label>
            <input
              type="text"
              name="propertyName"
              value={owner.propertyName}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {showError && errorMessage.propertyName && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.propertyName}</p>
            )}
          </div>

          {/* Property GST */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Property GST</label>
            <input
              type="text"
              name="PropertyGST"
              value={owner.PropertyGST}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {showError && errorMessage.PropertyGST && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.PropertyGST}</p>
            )}
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">City</label>
            <input
              type="text"
              name="city"
              value={owner.city}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {showError && errorMessage.city && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.city}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={owner.address}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {showError && errorMessage.address && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.address}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={owner.password}
              onChange={handleInputChange}
              placeholder="Enter new password"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {showError && errorMessage.password && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="md:col-span-2 w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
