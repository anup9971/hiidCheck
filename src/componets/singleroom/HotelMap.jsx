"use client";
import { useState } from "react";
import { MapPin, Search } from "lucide-react";

export default function HotelMap() {
  const [search, setSearch] = useState("");

  return (
    <div className="max-w-8xl md:mt-15 mt-10 mx-auto p-4 space-y-4">
      {/* Hotel Title */}
      <h2 className="text-xl text-gray-600 md:text-3xl font-semibold">
        Location of Pride Plaza Hotel Aerocity New Delhi
      </h2>

      {/* Address */}
      <p className="text-sm text-gray-600 flex items-center gap-2">
        <MapPin size={16} className="text-blue-600" />
        Asset 5-A, Hospitality District, Aerocity, Indra Gandhi International Airport, New Delhi 110037
      </p>

      {/* Search Box */}
      {/* <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search Area, Landmark or Transit nearby"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div> */}

      {/* Google Map */}
      <div className="w-full h-[300px] md:h-[400px] rounded-md overflow-hidden shadow">
        <iframe
          src="https://www.google.com/maps?q=Radisson+Blu+Plaza+Delhi+Airport&output=embed"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          className="border-none"
        ></iframe>
      </div>
    </div>
  );
}
