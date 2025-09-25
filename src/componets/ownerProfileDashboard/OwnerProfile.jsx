"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { FiEdit } from "react-icons/fi";
import OwnerProfileSideBar from "./OwnerProfileSideBar";

const OwnerProfile = () => {

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
  // const profile = {
  //   name: "Ankit Kumar",
  //   email: "akumarrai45@gmail.com",
  //   role: "Admin",
  //   phone: "8392823395",
  //   joined: "2023-08-01",
  // };

  return (
    <div className="min-h-screen flex md:pt-20 text-black mt-[-4px]  pb-20 md:pb-25  flex-col md:flex-row bg-gray-100 p-4 md:p-6 gap-6">
      
      {/* Sidebar */}
      <aside className="w-full md:w-95 p-2 md:p-2 flex-shrink-0">
        <p className="text-black text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          Owner Profile
        </p>

        <OwnerProfileSideBar owner={owner} formatDate={formatDate}  />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white shadow rounded-lg p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Profile</h1>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-6 flex justify-between items-center">
            Owner Information
            <Link href={`/owner-update-profile/${owner?._id}`}>
              <span className="text-blue-500 hover:text-blue-700 hover:bg-gray-100 p-2 rounded">
                <FiEdit />
              </span>
            </Link>
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between text-sm md:text-base">
              <span className="font-medium text-gray-600">Name:</span>
              <span>{owner?.name}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span className="font-medium text-gray-600">Email:</span>
              <span>{owner?.email}</span>
            </div>
             <div className="flex justify-between text-sm md:text-base">
              <span className="font-medium text-gray-600">Property Name:</span>
              <span>{owner?.propertyName}</span>
            </div>

            <div className="flex justify-between text-sm md:text-base">
              <span className="font-medium text-gray-600">Role:</span>
              <span>{owner?.role}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span className="font-medium text-gray-600">GST Number:</span>
              <span>{owner?.PropertyGST}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span className="font-medium text-gray-600">Phone:</span>
              <span>{owner?.phone}</span>
            </div>
               <div className="flex justify-between text-sm md:text-base">
              <span className="font-medium text-gray-600">Address:</span>
              <span>{owner?.address}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span className="font-medium text-gray-600">Joined:</span>
              <span>{owner?.createdAt ?formatDate(owner?.createdAt):"N/A"}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerProfile;
