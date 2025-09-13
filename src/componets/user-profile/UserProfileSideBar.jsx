import Link from 'next/link'
import React from 'react'
import { FiEdit } from "react-icons/fi";

import { BiSolidOffer } from "react-icons/bi";
import { FaClipboardList, FaSignOutAlt, FaRegUser } from "react-icons/fa";
import { usePathname } from 'next/navigation';
export default function UserProfileSideBar({user}) {
  const pathname = usePathname(); 
 
  const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
  
  return (
    <>
         <aside className="w-full col-span-1 pb-10 md:h-100 bg-white rounded-lg shadow p-4 md:p-6">
              <div className="flex items-center pt-3 gap-4">
                <img
                  src={`http://localhost:3000/${user?.pic}`}
                  alt="avatar"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-medium text-lg">{user?.name}</h2>
                  {/* <p className="text-sm text-gray-500">{user?.email}</p> */}
                  <p className="text-sm text-gray-500">{user?.phone}</p>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-600 space-y-2">
                <p>
                  <span className="font-medium">Member since: </span>
                  {formatDate(user?.createdAt)}
                </p>
                <p>
                  <span className="font-medium">Total bookings: </span>
                  2
                </p>
              </div>

             <div className="mt-6 grid grid-cols-2 gap-2">
               <Link
                 href="/user-profile"
                 className={`w-full px-3 flex gap-2 text-[15px] py-2 rounded text-sm
                   ${pathname === "/user-profile" 
                     ? "text-white bg-[#5f8575]  hover:bg-[#5f9675]"
                     : "text-black bg-gray-100 hover:bg-gray-200" }`}
               >
                 <FaRegUser className="text-[17px]" /> Profile
               </Link>
             
               <Link
                 href="/user-booking"
                 className={`w-full px-3 flex gap-2 text-[15px] py-2 rounded text-sm
                   ${pathname === "/user-booking" 
                     ? "text-white bg-[#5f8575] hover:bg-[#5f9675]" 
                     : "text-black bg-gray-100 00 "}`}
               >
                 <FaClipboardList className="text-[17px]" /> Booking
               </Link>
             
               <Link
                 href="/user-offers"
                 className={`w-full px-3 flex gap-2 text-[15px] py-2 rounded text-sm
                   ${pathname === "/user-offers" 
                     ? "text-white bg-[#5f8575] hover:bg-[#5f9675]" 
                     : " text-black bg-gray-100 hover:bg-gray-200"}`}
               >
                 <BiSolidOffer className="text-[18px]" /> Offers
               </Link>
             
               <Link
                  href={`/user-update-profile/${user?._id}`}
                  className={`w-full px-3 flex gap-2 text-[15px] py-2 rounded text-sm
                    ${pathname === `/user-update-profile/${user?._id}` 
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
  )
}
