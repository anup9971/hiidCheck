"use client";

import { useState, useEffect } from "react";
import OwnerProfileSideBar from "../ownerProfileDashboard/OwnerProfileSideBar";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function OwnerUpdateCorporate({ corporateData }) {
  const router = useRouter();

  // Sample corporate data if corporateData prop is not passed
  const initialData = corporateData || {
    hotelName: "Tech Solutions Ltd.",
    title: "Corporate Retreat",
    description: "A premium stay for corporate clients.",
    image: "/images/corporate1.jpg", // existing image
    capacity: 150,
    location: "New Delhi",
    amenities: ["WiFi", "Parking", "Restaurant"],
  };

  const [formData, setFormData] = useState(initialData);

  const amenitiesOptions = [
    "WiFi",
    "Parking",
    "Swimming Pool",
    "Restaurant",
    "Gym",
    "Conference Room",
    "Bar",
    "Spa",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value),
      }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Corporate Data:", formData);
    toast.success("Corporate info updated!");
    router.back();
    // TODO: API call to update corporate info
  };

  const profile = {
    name: "Admin User",
    email: "admin@example.com",
    phone: "1234567890",
    memberSince: "2022-01-01",
  };

  return (
    <div className="flex flex-col mt-[-4px] pt-15 pb-20 md:flex-row min-h-screen bg-gray-100 text-black">
      {/* Sidebar */}
      <aside className="w-full md:w-[450px] p-6 ">
        <h2 className="text-2xl font-bold mb-4">Owner Profile</h2>
        <OwnerProfileSideBar user={profile} />
      </aside>

      {/* Update Form */}
      <main className="flex-1 p-2 md:p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Update Corporate</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hotel Name & Title */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1">Hotel Name</label>
                <input
                  type="text"
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-600 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full border p-3 rounded-lg"
                required
              ></textarea>
            </div>

            {/* Existing Image */}
            {formData.image && typeof formData.image === "string" && (
              <div className="mb-3">
                <label className="block text-gray-600 mb-1">Current Image</label>
                <img
                  src={formData.image}
                  alt="Corporate"
                  className="w-40 h-40 object-cover rounded"
                />
              </div>
            )}

            {/* Upload Image & Capacity */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1">Upload New Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-600 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-gray-600 mb-2">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {amenitiesOptions.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onChange={handleChange}
                      className="accent-[#5f8575]"
                    />
                    <span className="text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5f8575] text-white py-3 rounded-lg hover:bg-[#4e6b60] transition"
            >
              Update Corporate Info
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
