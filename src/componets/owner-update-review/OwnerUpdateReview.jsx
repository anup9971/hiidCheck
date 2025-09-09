"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import OwnerProfileSideBar from "../ownerProfileDashboard/OwnerProfileSideBar";

export default function OwnerUpdateReview() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get("id"); // Get review id from query params

  // Dummy data simulating fetched review
  const initialReviews = [
    {
      _id: "r1",
      name: "John Doe",
      group: "Couple",
      profileImg: "/images/profile1.jpg",
      reviewImg: "/images/room1.jpg",
      rating: 4,
      message: "Great stay, very comfortable!",
      date: "2025-09-01",
      reply: "",
    },
    {
      _id: "r2",
      name: "Jane Smith",
      group: "Family",
      profileImg: "/images/profile2.jpg",
      reviewImg: "/images/room2.jpg",
      rating: 5,
      message: "Excellent service and facilities!",
      date: "2025-09-05",
      reply: "Thank you for your feedback!",
    },
  ];

  // Find the selected review by id
  const selectedReview = initialReviews.find((r) => r._id === reviewId) || initialReviews[0];

  const [reply, setReply] = useState(selectedReview.reply || "");
  const [error, setError] = useState("");

  const profile = {
    name: "Ankit Kumar",
    email: "akumarrai45@gmail.com",
    phone: "8392823395",
    memberSince: "2023-08-01",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reply.trim()) {
      setError("Reply is required");
      return;
    }
    // Here you would normally send API request
    toast.success("Reply submitted!");
    router.back();
  };

  return (
    <div className="min-h-screen text-black bg-gray-100 mt-[-4px] pt-15 pb-25 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-84  p-4">
        <p className="text-2xl font-bold mb-6 text-center md:text-left">Owner Dashboard</p>
        <OwnerProfileSideBar user={profile} />
      </aside>

      {/* Review + Reply Form */}
      <div className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Reply to Review</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
              type="text"
              value={selectedReview.name}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            />

            {/* Group */}
            <input
              type="text"
              value={selectedReview.group}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            />

            {/* Message */}
            <textarea
              value={selectedReview.message}
              disabled
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 resize-none"
            ></textarea>

            {/* Rating */}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={24}
                  className={`text-gray-300 ${i < selectedReview.rating ? "text-yellow-400" : ""}`}
                />
              ))}
            </div>

            {/* Review Image */}
            {selectedReview.reviewImg && (
              <img
                src={selectedReview.reviewImg}
                alt="Review"
                className="w-full h-40 object-cover rounded"
              />
            )}

            {/* Profile Image */}
            {selectedReview.profileImg && (
              <img
                src={selectedReview.profileImg}
                alt={selectedReview.name}
                className="w-16 h-16 object-cover rounded-full mt-2"
              />
            )}

            {/* Reply Input */}
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows="3"
              placeholder="Write your reply..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#5f8575]"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#5f8575] text-white py-2 rounded-lg font-semibold hover:bg-[#6cb395] transition"
            >
              Submit Reply
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
