"use client";
import { CheckCircle, Dumbbell, Utensils } from "lucide-react";
// import { Spa } from "@mui/icons-material"; // You can use any spa icon

export default function FoodAmenities({hotels}) {
  return (
    <section className="max-w-7xl mt-9 text-gray-800 mx-auto p-6 bg-gray-50 rounded-xl shadow">
      {/* Heading */}
      <h2 className="text-xl font-semibold mb-4">
        Amenities at <span className="text-gray-800">{hotels.name}</span>
      </h2>

      {/* Popular Amenities */}
      <div className="mb-6">
        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md">
          POPULAR AMENITIES
        </span>

        <div className="flex flex-wrap items-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <CheckCircle className="w-5 h-5 text-gray-700" />
            Jacuzzi
          </div>
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            {/* <Spa className="w-5 h-5 text-gray-700" /> */}
            Spa
          </div>
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <Dumbbell className="w-5 h-5 text-gray-700" />
            Gym
          </div>
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <Utensils className="w-5 h-5 text-gray-700" />
            Restaurant
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-sm text-gray-700">
        <div>
          <h3 className="font-semibold mb-2">Popular Amenities</h3>
          <ul className="space-y-1">
            <li>• Jacuzzi</li>
            <li>• Spa</li>
            <li>• Gym</li>
            <li>• Restaurant</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Basic Facilities</h3>
          <ul className="space-y-1">
            <li>• Housekeeping</li>
            <li>• Express check-in/check-out</li>
            <li>• Free Wi-Fi</li>
            <li>• Smoking Rooms</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">General Services</h3>
          <ul className="space-y-1">
            <li>• Ticket/Tour Assistance</li>
            <li>• Wake-up Call</li>
            <li>• Multilingual Staff</li>
            <li>• Concierge</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Health and wellness</h3>
          <ul className="space-y-1">
            <li>• First-aid Services</li>
            <li>• Gym</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Transfers</h3>
          <ul className="space-y-1">
            <li>• Paid Railway Station Transfers</li>
            <li>• Paid Airport Transfers</li>
            <li>• Paid Bus Station Transfers</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
