"use client"

import FormValidator from "@/componets/FormValidator";
import { useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

export default function ReviewForm() {
 
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const router = useRouter();

  // main form data
  const [formData, setFormData] = useState({
    name: "",
    group: "",
    message: "",
    profileImage: null,
    reviewImages: [],
  });

  // validation errors (start empty)
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    group: "",
    message: "",
    profileImage: "",
    reviewImages: "",
    rating: "",
  });

  const [show, setShow] = useState(false);

  // handle text & select input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrorMessage((prev) => ({
      ...prev,
      [name]: FormValidator(e), // run validator
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle profile image
  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));
    setErrorMessage((prev) => ({
      ...prev,
      profileImage: file ? "" : "Profile image is required",
    }));
  };

  // handle multiple images
  const handleMultipleImages = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      reviewImages: files,
    }));
    setErrorMessage((prev) => ({
      ...prev,
      reviewImages: files.length ? "" : "At least one image is required",
    }));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // validation check
      let item = Object.values(errorMessage).find((a) => a !== "");
      if (item || !rating) {
        setShow(true);
        if (!rating) {
          setErrorMessage((prev) => ({ ...prev, rating: "Rating is required" }));
        }
        return;
      }

      // prepare formData
      let form = new FormData();
      form.append("name", formData.name);
      form.append("group", formData.group);
      form.append("message", formData.message);
      form.append("rating", rating);
      if (formData.profileImage) {
        form.append("profileImage", formData.profileImage);
      }
      for (let img of formData.reviewImages) {
        form.append("reviewImages", img);
      }

      // send
      let response = await fetch("/api/review", {
        method: "POST",
        body: form,
      });

      let res = await response.json();
      // console.log(res);

      if (res.success===true) {
        toast.success("Review successfully submitted");
       router.push("/")
        setFormData({
          name: "",
          group: "",
          message: "",
          profileImage: null,
          reviewImages: [],
        });
        setRating(0);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Error submitting review");
    }
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
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
            />
            {show && errorMessage.name && <p className="text-red-500 text-sm">{errorMessage.name}</p>}
          </div>

          {/* Select Group */}
          <div>
            <select
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="w-full px-4 text-gray-900 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
            >
              <option value="">Select Group</option>
              <option value="Family Traveller">Family Traveller</option>
              <option value="Group Traveller">Group Traveller</option>
              <option value="Solo Traveller">Solo Traveller</option>
              <option value="Other">Other</option>
            </select>
            {show && errorMessage.group && <p className="text-red-500 text-sm">{errorMessage.group}</p>}
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-gray-700 text-sm mb-1 font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              name="profileImage"
              onChange={handleProfileImage}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {show && errorMessage.profileImage && <p className="text-red-500 text-sm">{errorMessage.profileImage}</p>}
          </div>

          {/* Upload Images */}
          <div>
            <label className="block text-sm mb-1 text-gray-700 font-medium">Upload Review Images</label>
            <input
              type="file"
              accept="image/*"
              name="reviewImages"
              multiple
              onChange={handleMultipleImages}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            {show && errorMessage.reviewImages && <p className="text-red-500 text-sm">{errorMessage.reviewImages}</p>}
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
                      className="hidden"
                      onClick={() => setRating(starValue)}
                    />
                    <FaStar
                      size={28}
                      className={`cursor-pointer transition-colors ${
                        starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
            {show && errorMessage.rating && <p className="text-red-500 text-sm">{errorMessage.rating}</p>}
          </div>

          {/* Message */}
          <textarea
            name="message"
            rows="4"
            placeholder="Write your experience..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 text-gray-900 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
          ></textarea>
          {show && errorMessage.message && <p className="text-red-500 text-sm">{errorMessage.message}</p>}

          {/* Submit */}
          <div className="mt-5">
            <button
              type="submit" 
              className="w-full bg-[#5f8575] text-white py-2 rounded-lg font-semibold hover:bg-[#6cb395] transition"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
