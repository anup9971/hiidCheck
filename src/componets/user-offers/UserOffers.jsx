"use client";

import Link from "next/link";
import React from "react";
import { BiSolidOffer } from "react-icons/bi";

import UserProfileSideBar from "../user-profile/UserProfileSideBar";

const UserOffers = () => {
  const user = {
    name: "Ankit Kumar",
    email: "ankit@example.com",
    phone: "+91 98765 6335",
    avatar: "https://i.pravatar.cc/150?img=12",
    memberSince: "Jan 2023",
  };

  const offers = [
    {
      id: 1,
      title: "Summer Special 20% OFF",
      description: "Get flat 20% discount on your next hotel booking this summer.",
      expiry: "30 Sep 2025",
      code: "SUMMER20",
    },
    {
      id: 2,
      title: "Weekend Getaway Deal",
      description: "Enjoy extra 15% discount on weekend stays.",
      expiry: "15 Oct 2025",
      code: "WEEKEND15",
    },
    {
      id: 3,
      title: "Festive Offer",
      description: "Celebrate festivals with flat 25% off on bookings.",
      expiry: "25 Dec 2025",
      code: "FESTIVE25",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50  mt-[-4px] pt-20 pb-25 text-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">My Offers</h1>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
            <UserProfileSideBar user={user} />
          {/* Main Content */}
          <div className="col-span-3 bg-white shadow rounded-lg p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <BiSolidOffer className="text-2xl text-orange-500" /> Available Offers
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="border rounded-lg p-4 hover:shadow-md transition bg-gray-50"
                >
                  <h3 className="font-semibold text-lg">{offer.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Expiry:</span> {offer.expiry}
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded">
                      Code: {offer.code}
                    </span>
                    <button className="px-3 py-1 text-sm bg-[#5f9675] text-white rounded hover:bg-[#33744d]">
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOffers;
