import Link from "next/link";
import React from "react";

export default function HotelCard({ hotel }) {
  // console.log("hotel card ", hotel);
  
  return (
    <div className="border rounded shadow hover:shadow-lg transition p-3 bg-white flex flex-col md:flex-row gap-4">
      <img
        src={hotel.image[0]}
        alt={hotel.name}
        className="w-full md:w-60 h-40 object-cover rounded"
      />
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg text-gray-700 font-bold">{hotel.name}</h3>
          <p className="text-sm text-gray-500">{hotel.location}</p>
          <p className="text-sm text-gray-600 mt-1">
            Property Type: {hotel.propertyType}
          </p>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className="text-gray-700">⭐ 4/5</span>
            <span className="text-green-700">₹ {hotel.price}/Night</span>
          </div>
        </div>

        <div className="flex gap-2 mt-3 flex-wrap items-center text-xs">
          {hotel.features?.parking && (
            <span className="bg-green-200 px-2 py-1 text-gray-500 rounded">
              Parking
            </span>
          )}
          {hotel.features?.restaurant && (
            <span className="bg-green-200 px-2 py-1 text-gray-500 rounded">
              Restaurant
            </span>
          )}

          {/* ✅ Book Now Button */}
          <Link
            href={`/hotel/singleroom/${hotel.id}`}
            className="ml-auto rounded "
          >
            <span className="bg-[#487c66] px-4 py-[9px]   w-full rounded  text-white text-sm hover:bg-[#5faf8e] transition  "> Book Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
