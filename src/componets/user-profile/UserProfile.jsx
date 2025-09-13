"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { FiEdit } from "react-icons/fi";
import UserProfileSideBar from "./UserProfileSideBar";

const UserProfile = () => {
  let user_id = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
  const [user, setUser] = useState(null)
  const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
    }

useEffect(() => {
  const getUserData = async () => {
    try {
      let res = await fetch(`/api/user/${user_id}`, {
        method: "GET",
      });
      let data = await res.json();
      console.log(data);

      if (data?.success) {
        setUser(data.data);
        console.log(data.data.pic); // ✅ yaha user.data.img ki jagah data.data.pic
      } else {
        console.error("Failed to fetch user:", data.error || data.message);
      }
    } catch (error) {
      console.error("❌ Error fetching user:", error.message);
    }
  };

  getUserData();
}, [user_id]);


  return (
    <>
      <div className="min-h-screen mt-[-4px] pb-20 pt-10 bg-gray-50 text-black p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold">My Profile</h1>
          </div>

          {/* Responsive Layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
              <UserProfileSideBar user={user}/>
            {/* Main Content */}
            <div className="col-span-3 bg-white shadow rounded-lg p-8 mt-6 lg:mt-0">
              <h2 className="text-xl font-semibold mb-6">
                User Information
                <Link href={`/user-update-profile/${user?._id}`}>
                  <span className="float-end text-blue-500 hover:text-blue-700 hover:bg-gray-100">
                    <FiEdit />
                  </span>
                </Link>
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Name:</span>
                  <span>{user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Email:</span>
                  <span>{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Role:</span>
                  <span>{user?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Phone:</span>
                  <span>{user?.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Joined:</span>
                  <span>{formatDate(user?.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
