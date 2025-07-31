"use client"
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    group: "",
    message: "",
    profileImage: null,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileImage = (e) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: e.target.files[0],
    }));
  };

  const handleMultipleImages = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completeData = { ...formData, rating };
    console.log(completeData);
    alert("Review submitted successfully!");
  };

  return (
    <div className="max-w-2xl pb-25 md:bg-white bg-gray-100 mx-auto px-4 py-6">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Write a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
            <div>
                 <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2  text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
          />
            </div>
             <div>
                 <input
            type="number"
            name="phone"
            placeholder="Your Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 text-gray-900  py-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
          />
            </div>

          {/* Select Group */}
          <div>

            <select
            name="group"
            value={formData.group}
            onChange={handleChange}
            required
            className="w-full px-4  text-gray-900  py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
          >
            <option value="">Select Group</option>
            <option value="Family Traveller">Family Traveller</option>
            <option value="Group Traveller">Group Traveller</option>
            <option value="Solo Traveller">Solo Traveller</option>
            <option value="Other">Other</option>
          </select>
          </div>

          {/* Profile Image */}
          <div>
            <label className="block  text-gray-700  text-sm mb-1 font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImage}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-lg  file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
            />
          </div>

          {/* Upload Images */}
          <div>
            <label className="block text-sm mb-1  text-gray-700  font-medium">Upload Review Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultipleImages}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-purple-50 file:text-purple-700
                         hover:file:bg-purple-100"
            />
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm text-gray-700 mb-2 font-medium">Rating</label>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="rating"
                      value={starValue}
                      className="hidden"
                      onClick={() => setRating(starValue)}
                    />
                    <FaStar
                      size={28}
                      className={`cursor-pointer transition-colors ${
                        starValue <= (hover || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <textarea
            name="message"
            rows="4"
            placeholder="Write your experience..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 text-gray-900   py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
          ></textarea>

          {/* Submit */}
        <div className="mt-5">
           <button
            type="submit"
            className="w-full  bg-[#5f8575] text-white py-2 rounded-lg font-semibold hover:bg-[#6cb395] transition"
          >
            Submit Review
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}
