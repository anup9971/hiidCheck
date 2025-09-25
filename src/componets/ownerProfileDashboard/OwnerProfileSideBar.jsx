import Link from 'next/link';
import React from 'react';
import { FiEdit } from "react-icons/fi";
import { FaClipboardList, FaSignOutAlt, FaRegUser, FaPlus } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { BsBuildings } from "react-icons/bs";
import { RiMessage2Line } from "react-icons/ri";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";


export default function OwnerProfileSideBar({ owner, formatDate }) {
  const pathname = usePathname();

  const links = [
    { href: "/owner-profile", icon: <FaRegUser />, label: "Profile" },
    { href: "/owner-all-booking", icon: <FaClipboardList />, label: "Booking" },
    { href: "/owner-add-hotel", icon: <FaPlus />, label: "Add New Hotel" },
    { href: "/owner-add-corporate", icon: <FaPlus />, label: "Add New Corporate" },
    { href: "/owner-all-hotels", icon: <BsBuildings />, label: "All Hotel" },
    { href: "/owner-all-corporate", icon: <HiOutlineBuildingOffice2 />, label: "All Corporates" },
    { href: "/owner-all-reviews", icon: <RiMessage2Line/>, label: "All Reviews" },
    { href: `/owner-update-profile/${owner?._id}`, icon: <FiEdit />, label: "Edit Profile" },
  ];

  return (
    <aside className="w-full pb-10 md:h-auto bg-white shadow-md rounded-md p-4 md:p-6">
      {/* User info */}
      <div className="flex items-center pt-3 gap-4">
        <img
          src={`${owner?.pic}`}
          alt="avatar"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="font-medium uppercase text-lg">{owner?.name}</h2>
          {/* <p className="text-sm text-gray-500">{owner?.email}</p> */}
          <p className="text-sm text-gray-500">{owner?.phone}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 text-sm text-gray-600 space-y-2">
        <p>
          <span className="font-medium">Member since: </span>
          {owner?.createdAt ? formatDate(owner?.createdAt):"N/A"}
        </p>
        <p>
          <span className="font-medium">Total bookings: </span>
          2
        </p>
      </div>

      {/* Navigation Links */}
      <div className="mt-6 flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded text-sm font-medium
              ${pathname === link.href
                ? "bg-[#5f8575] text-white hover:bg-[#5f9675]"
                : "bg-gray-100 text-black hover:bg-gray-200"}`
            }
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </div>

      {/* Logout */}
      <Link
        href="/"
        className="w-full mt-4 flex justify-center items-center gap-2 px-4 py-2 bg-gray-100 rounded text-sm font-medium hover:bg-gray-200"
      >
        <FaSignOutAlt /> Logout
      </Link>
    </aside>
  );
}
