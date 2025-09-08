"use client";

import Link from "next/link";
import React from "react";

import { FiEdit } from "react-icons/fi";
import AdminProfileSideBar from "./AdminProfileSideBar";

const AdminProfile = () => {
  const user = {
    name: "Ankit Kumar",
    email: "ankit@example.com",
    phone: "+91 98765 6335",
    avatar: "https://i.pravatar.cc/150?img=12",
    memberSince: "Jan 2023",
    role: "User",
  };

  return (
    <>
      <div className="min-h-screen mt-[-4px] pb-20 pt-10 bg-gray-50 text-black p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold">Admin Dashboard</h1>
          </div>

          {/* Responsive Layout */}
          <div className="flex  flex-col lg:grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
     
              <AdminProfileSideBar user={user} className="self-start md:h-[600px]" />
            {/* Main Content */}
            <div className="col-span-3 md:h-[380px] bg-white shadow rounded-lg p-8 mt-6 lg:mt-0">
              <h2 className="text-xl font-semibold mb-6">
                Admin Information
                <Link href="/admin/update-profile">
                  <span className="float-end text-blue-500 hover:text-blue-700 hover:bg-gray-100">
                    <FiEdit />
                  </span>
                </Link>
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Name:</span>
                  <span>{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Role:</span>
                  <span>{user.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Phone:</span>
                  <span>{user.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Joined:</span>
                  <span>{user.memberSince}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
