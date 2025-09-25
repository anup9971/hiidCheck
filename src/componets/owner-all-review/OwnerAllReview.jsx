"use client";

import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import OwnerProfileSideBar from "../ownerProfileDashboard/OwnerProfileSideBar";
import ownerFechData from "@/app/admin/ownerFetchData";
import { formatDate } from "@/app/untils/formatDate";

export default function OwnerReviews() {
  const router = useRouter();
 let {owner} = ownerFechData()
  // Dummy review data
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
    },
  ];

  const profile = {
    name: "Ankit Kumar",
    email: "akumarrai45@gmail.com",
    phone: "8392823395",
    memberSince: "2023-08-01",
  };

  const [reviews, setReviews] = useState(initialReviews);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((r) => r._id !== id));
      alert("Review deleted!");
    }
  };

  return (
    <div className="min-h-screen mt-[-4px] pt-10 md:pb-25 pb-15 bg-gray-100 p-4 md:p-6 text-black">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-95 p-2 md:p-4">
          <p className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
            Owner Reviews
          </p>
          <OwnerProfileSideBar owner={owner} formatDate={formatDate} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white shadow rounded-lg p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
            Customer Reviews
          </h1>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border">Profile</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Group</th>
                  <th className="p-2 border">Review Image</th>
                  <th className="p-2 border">Rating</th>
                  <th className="p-2 border">Message</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review._id} className="border-b">
                    <td className="p-2 border">
                      <img
                        src={review.profileImg}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="p-2 border">{review.name}</td>
                    <td className="p-2 border">{review.group}</td>
                    <td className="p-2 border">
                      {review.reviewImg ? (
                        <img
                          src={review.reviewImg}
                          alt="Review"
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="p-2 border">{review.rating} ⭐</td>
                    <td className="p-2 border">{review.message}</td>
                    <td className="p-2 border">{review.date}</td>
                    <td className="p-2 border flex gap-2">
                      <button
                        onClick={() =>
                         router.push(`/owner-update-review/${review._id}`)
                        }
                        className="bg-[#5f8575] text-white px-2 py-1 rounded flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-gray-50 shadow rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.profileImg}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="font-semibold">{review.name}</h2>
                      <p className="text-sm text-gray-500">{review.group}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        router.push(`/owner-update-review/${review._id}`)
                      }
                      className="bg-[#5f8575] text-white px-2 py-1 rounded flex items-center gap-1 text-sm"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1 text-sm"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>

                {review.reviewImg && (
                  <img
                    src={review.reviewImg}
                    alt="Review"
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}

                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Rating:</span> {review.rating} ⭐
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Message:</span> {review.message}
                </p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
