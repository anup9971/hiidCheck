"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { FiEdit } from "react-icons/fi";
import AdminProfileSideBar from "./AdminProfileSideBar";

const AdminProfile = () => {
  // const user = {
  //   name: "Ankit Kumar",
  //   email: "ankit@example.com",
  //   phone: "+91 98765 6335",
  //   avatar: "https://i.pravatar.cc/150?img=12",
  //   memberSince: "Jan 2023",
  //   role: "User",
  // };

   let owner_id = typeof window !== "undefined" ? localStorage.getItem("owner_id") : null;
      const [owner, setOwner] = useState(null)
      const formatDate = (isoDate) => {
      const date = new Date(isoDate);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
        }
      useEffect(() => {
        const fetchOwner = async () => {
          try {
            const res = await fetch(`/api/owner/${owner_id}`);
            const data = await res.json();
            console.log(data);
            setOwner(data)
          } catch (err) {
            console.error("Error fetching owner data:", err);
          }
        };
        if (owner_id) fetchOwner();
      }, [owner_id]);

  return (
    <>
      

      <div className="min-h-screen mt-[-4px]  pt-15 pb-20 md:pt-20 md:mb-20 bg-white text-black p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold">Admin Dashboard</h1>
          </div>

          {/* Responsive Layout */}
          <div className="flex  flex-col lg:grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
                
              <AdminProfileSideBar owner={owner} formatDate={formatDate} className="self-start md:h-[680px]" />
            {/* Main Content */}
            <div className="col-span-3 md:h-[380px] bg-white shadow rounded-lg p-8 mt-6 lg:mt-0">
              <h2 className="text-xl font-semibold mb-6">
                Admin Information
                <Link href={`/admin/update-profile/${owner?._id}`}>
                  <span className="float-end text-blue-500 hover:text-blue-700 hover:bg-gray-100">
                    <FiEdit />
                  </span>
                </Link>
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Name:</span>
                  <span>{owner?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Email:</span>
                  <span>{owner?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Role:</span>
                  <span>{owner?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Phone:</span>
                  <span>{owner?.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Joined:</span>
                  <span>{owner?.memberSince}</span>
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
