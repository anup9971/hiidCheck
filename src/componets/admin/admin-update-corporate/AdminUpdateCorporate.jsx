"use client";

import { useState, useEffect } from "react";

import AdminProfileSideBar from "../admin-dasboard/AdminProfileSideBar";

export default function AdminUpdateCorporate({ existingData }) {
  const [formData, setFormData] = useState({
    hotelName: "",
    title: "",
    description: "",
    image: null,
    capacity: "",
    location: "",
    amenities: [],
  });

  // Update ke liye existing data preload karna
  useEffect(() => {
    if (existingData) {
      setFormData({
        hotelName: existingData.hotelName || "",
        title: existingData.title || "",
        description: existingData.description || "",
        image: null, // update ke liye nayi image choose karni padegi
        capacity: existingData.capacity || "",
        location: existingData.location || "",
        amenities: existingData.amenities || [],
      });
    }
  }, [existingData]);

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
    console.log("Update Corporate Data:", formData);
    // later: call PUT/PATCH API => /api/corporates/:id
  };

  return (
    <div className="flex flex-col text-black mt-[-4px] pb-25 md:pt-15px pt-15 md:mt-[-4px] md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-[350px] p-6">
        <h2 className="text-2xl font-bold mb-4">Owner Profile</h2>
        <AdminProfileSideBar user={formData} />
      </aside>

      {/* Form Section */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
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
                  placeholder="Enter hotel name"
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
                  placeholder="Enter title"
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
                placeholder="Enter description"
                rows="4"
                className="w-full border p-3 rounded-lg"
                required
              ></textarea>
            </div>

            {/* Image & Capacity */}
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
                  placeholder="Enter capacity"
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
                placeholder="Enter location"
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
              Update Corporate
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
