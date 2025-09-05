import Link from 'next/link'
import React from 'react'
import { FiEdit } from "react-icons/fi";

import { BiSolidOffer } from "react-icons/bi";
import { FaClipboardList, FaSignOutAlt, FaRegUser } from "react-icons/fa";
export default function UserProfileSideBar({user}) {
  return (
    <>
         <aside className="w-full col-span-1 bg-white rounded-lg shadow p-4 md:p-6">
              <div className="flex items-center gap-4">
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

              <div className="mt-6 grid grid-cols-2 gap-2">
                <Link
                  href="/user-profile"
                  className="w-full px-3 flex gap-2 text-[15px] hover:bg-gray-200 py-2 bg-gray-100 rounded text-sm"
                >
                  <FaRegUser className="text-[17px]" /> Profile
                </Link>
                <Link
                  href="/user-booking"
                  className="w-full px-3 flex gap-2 text-[15px] hover:bg-gray-200 py-2 bg-gray-100 rounded text-sm"
                >
                  <FaClipboardList className="text-[17px]" /> Booking
                </Link>
                <Link
                  href="/user-offers"
                  className="w-full px-3 flex gap-2 text-[15px] hover:bg-gray-200 py-2 bg-gray-100 rounded text-sm"
                >
                  <BiSolidOffer className="text-[18px]" /> Offers
                </Link>
                <Link
                  href="/user-update-profile"
                  className="w-full px-3 flex gap-2 text-[15px] hover:bg-gray-200 py-2 bg-gray-100 rounded text-sm"
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
  )
}
