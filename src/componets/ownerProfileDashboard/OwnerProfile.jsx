"use client";

import Link from "next/link";
import React from "react";
import { FaUser, FaPlus, FaHotel, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const OwnerProfile = () => {
  const profile = {
    name: "Ankit Kumar",
    email: "akumarrai45@gmail.com",
    role: "Admin",
    phone: "8392823395",
    joined: "2023-08-01",
  };

  const mobileActions = [
    { name: "Add New Property", icon: <FaPlus />, link: "/owner-add-property" },
    { name: "All Properties", icon: <FaHotel />, link: "/owner-all-property" },
    { name: "Bookings", icon: <FaClipboardList />, link: "/owner-all-booking" },
    { name: "Update Profile", icon: <FiEdit />, link: "/owner-update-profile" },
    { name: "Logout", icon: <FaSignOutAlt />, link: "/" },
  ];

  return (
    <div className="min-h-screen text-black bg-gray-100">
      {/* Desktop / Tablet Layout */}
      <div className="hidden md:flex min-h-screen p-5">
        {/* Sidebar */}
        <aside className="w-64 h-[380px] mt-12 bg-white shadow rounded-lg  text-gray-800 p-6">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <ul className="space-y-4">
            <Link  href="/owner-profile"><li className="flex hover:bg-gray-100  p-3  items-center space-x-2  cursor-pointer"><FaUser /> <span>Profile</span></li></Link>
            <Link  href="/owner-add-property"><li className="flex hover:bg-gray-100  p-3  items-center space-x-2  cursor-pointer"><FaPlus /> <span>Add New Property</span></li></Link>
            <Link  href="/owner-all-property"><li className="flex hover:bg-gray-100   p-3 items-center space-x-2  cursor-pointer"><FaHotel /> <span> All Properties</span></li></Link>
            <Link  href="/owner-all-booking"><li className="flex hover:bg-gray-100  p-3 items-center space-x-2  cursor-pointer"><FaClipboardList /> <span>Booking</span></li></Link>
            <li className="flex hover:bg-gray-100  items-center space-x-2 p-3  cursor-pointer"><FaSignOutAlt /> <span>Logout</span></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-700">Profile</h1>
            <Link href="/owner-add-property">
              <button className="flex items-center gap-2 bg-white hover:bg-black hover:text-white text-black border px-4 py-2 rounded shadow">
                <FaPlus /> Add New Property
              </button>
            </Link>
          </div>

          {/* Profile Card */}
          <div className="bg-white shadow rounded-lg p-8 max-w-lg">
            <h2 className="text-xl font-semibold mb-6">Admin Information <Link href="/owner-update-profile"><span className="float-end text-blue-500 hover:text-blue-700 hover:bg-gray-100"><FiEdit /></span></Link></h2>
            <div className="space-y-4">
              <div className="flex justify-between"><span className="font-medium text-gray-600">Name:</span><span>{profile.name}</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-600">Email:</span><span>{profile.email}</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-600">Role:</span><span>{profile.role}</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-600">Phone:</span><span>{profile.phone}</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-600">Joined:</span><span>{profile.joined}</span></div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden p-5">
        {/* Admin Info Card */}
        <div className="bg-white shadow rounded-lg p-6 mb-6 flex flex-col items-center text-center">
          
          <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center text-3xl font-bold text-gray-700">
            {profile.name.split(" ").map(n => n[0]).join("")} 
          </div>
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-500">{profile.email}</p>
          <span className="mt-2 px-3 py-1 bg-gray-200 rounded-full text-gray-700 text-sm">{profile.role}</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {mobileActions.map((item, idx) => (
            <Link key={idx} href={item.link}>
              <div className="flex items-center justify-between mt-2 bg-white shadow-md rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="text-gray-400">&gt;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
