"use client";

import Link from "next/link";
import React from "react";
import { FaPlus, FaHotel, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import OwnerProfileSideBar from "./OwnerProfileSideBar";

const OwnerProfile = () => {
  const profile = {
    name: "Ankit Kumar",
    email: "akumarrai45@gmail.com",
    role: "Admin",
    phone: "8392823395",
    joined: "2023-08-01",
  };

  return (
    <div className="min-h-screen flex text-black mt-[-4px] pt-15 pb-20 md:pb-25  flex-col md:flex-row bg-gray-100 p-4 md:p-6 gap-6">
      
      {/* Sidebar */}
      <aside className="w-full md:w-84 p-2 md:p-2 flex-shrink-0">
        <p className="text-black text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          Owner Profile
        </p>

        <OwnerProfileSideBar user={profile} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white shadow rounded-lg p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Profile</h1>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-6 flex justify-between items-center">
            Owner Information
            <Link href="/owner-update-profile">
              <span className="text-blue-500 hover:text-blue-700 hover:bg-gray-100 p-2 rounded">
                <FiEdit />
              </span>
            </Link>
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between text-sm md:text-base">
              <span className="font-medium text-gray-600">Name:</span>
              <span>{profile.name}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span className="font-medium text-gray-600">Email:</span>
              <span>{profile.email}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span className="font-medium text-gray-600">Role:</span>
              <span>{profile.role}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span className="font-medium text-gray-600">Phone:</span>
              <span>{profile.phone}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span className="font-medium text-gray-600">Joined:</span>
              <span>{profile.joined}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerProfile;
