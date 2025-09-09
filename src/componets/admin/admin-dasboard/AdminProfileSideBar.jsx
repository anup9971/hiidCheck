import Link from 'next/link'
import React from 'react'
import { FiEdit } from "react-icons/fi";

import { FaSignOutAlt, FaRegUser, FaHotel } from "react-icons/fa";
import { MdCorporateFare } from "react-icons/md";
import { LiaBookSolid } from "react-icons/lia";
import { PiUsersFourThin } from "react-icons/pi";
import { FaUserLock } from "react-icons/fa";

import { usePathname } from 'next/navigation';

export default function AdminProfileSideBar({ user,className }) {
  const pathname = usePathname();

  return (
    <>
      <aside className={`w-full text-black col-span-1 pb-10 ${className} bg-white rounded-lg shadow p-4 md:p-6`}>
       
        <div className="flex  items-center pt-3 gap-4">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-medium text-lg">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">{user.phone}</p>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-600 space-y-2">
          <p>
            <span className="font-medium">Member since: </span>
            {user.memberSince}
          </p>
          <p>
            <span className="font-medium">Total bookings: </span>
            2
          </p>
        </div>

        {/* All links full width */}
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/admin/dashboard"
            className={`w-full px-3 flex gap-2 items-center text-[15px] py-2 rounded text-sm
              ${pathname === "/admin/dashboard"
                ? "text-white bg-[#5f8575] hover:bg-[#5f9675]"
                : "text-black bg-gray-100 hover:bg-gray-200"}`}
          >
            <FaRegUser className="text-[17px]" /> Profile
          </Link>

          <Link
            href="/admin/allhotels"
            className={`w-full px-3 flex gap-2 items-center text-[15px] py-2 rounded text-sm
              ${pathname === "/admin/allhotels"
                ? "text-white bg-[#5f8575] hover:bg-[#5f9675]"
                : "text-black bg-gray-100 hover:bg-gray-200"}`}
          >
            <MdCorporateFare  className="text-[17px]" /> All Hotels
          </Link>

          <Link
            href="/admin/allcorporates"
            className={`w-full px-3 flex gap-2 items-center text-[15px] py-2 rounded text-sm
              ${pathname === "/admin/allcorporates"
                ? "text-white bg-[#5f8575] hover:bg-[#5f9675]"
                : "text-black bg-gray-100 hover:bg-gray-200"}`}
          >
            <FaHotel className="text-[18px]" /> All Corporates
          </Link>

          <Link
            href="/admin/totalbookings"
            className={`w-full px-3 flex gap-2 items-center text-[15px] py-2 rounded text-sm
              ${pathname === "/admin/totalbookings"
                ? "text-white bg-[#5f8575] hover:bg-[#5f9675]"
                : "text-black bg-gray-100 hover:bg-gray-200"}`}
          >
            <LiaBookSolid   className="text-[18px]" /> Totol Bookings
          </Link>

           <Link
            href="/admin/allclients"
            className={`w-full px-3 flex gap-2 items-center text-[15px] py-2 rounded text-sm
              ${pathname === "/admin/allclients"
                ? "text-white bg-[#5f8575] hover:bg-[#5f9675]"
                : "text-black bg-gray-100 hover:bg-gray-200"}`}
          >
            <PiUsersFourThin  className="text-[18px]" /> All Clients
          </Link>

             <Link
            href="/admin/allclients-access"
            className={`w-full px-3 flex gap-2 items-center text-[15px] py-2 rounded text-sm
              ${pathname === "/admin/allclients-access"
                ? "text-white bg-[#5f8575] hover:bg-[#5f9675]"
                : "text-black bg-gray-100 hover:bg-gray-200"}`}
          >
            <FaUserLock   className="text-[18px]" /> All Clients Access 
          </Link>

            {/* <Link
            href="/admin/admin-corporate-access"
            className={`w-full px-3 flex gap-2 items-center text-[15px] py-2 rounded text-sm
              ${pathname === "/admin/admin-corporate-access"
                ? "text-white bg-[#5f8575] hover:bg-[#5f9675]"
                : "text-black bg-gray-100 hover:bg-gray-200"}`}
          >
            <FaUserLock   className="text-[18px]" /> All Corporate Access 
          </Link> */}


              <Link
            href="/admin/admin-corporate-alluser"
            className={`w-full px-3 flex gap-2 items-center text-[15px] py-2 rounded text-sm
              ${pathname === "/admin/admin-corporate-alluser"
                ? "text-white bg-[#5f8575] hover:bg-[#5f9675]"
                : "text-black bg-gray-100 hover:bg-gray-200"}`}
          >
            <PiUsersFourThin   className="text-[18px]" /> All Corporate User 
          </Link>

          <Link
            href="/admin/update-profile"
            className={`w-full px-3 flex gap-2 items-center text-[15px] py-2 rounded text-sm
              ${pathname === "/admin/update-profile"
                ? "text-white bg-[#5f8575] hover:bg-[#5f9675]"
                : "text-black bg-gray-100 hover:bg-gray-200"}`}
          >
            <FiEdit className="text-[17px]" /> Edit
          </Link>
        </div>

        <Link
          href="/"
          className="w-full px-3 mt-4 flex justify-center items-center gap-2 text-[15px] hover:bg-gray-200 py-2 bg-gray-100 rounded text-sm text-center"
        >
          <FaSignOutAlt className="text-[17px]" /> Logout
        </Link>
      </aside>
    </>
  );
}
