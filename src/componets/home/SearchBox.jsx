"use client";

import { useState } from "react";

export default function SearchBox() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log({ destination, checkIn, checkOut });
  };

  return (
    <section className="w-full bg-white py-10 px-4 md:px-12 lg:px-24">
      <form
        onSubmit={handleSearch}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-gray-100 p-6 rounded-xl shadow-lg"
      >
        {/* Destination */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Destination</label>
          <input
            type="text"
            placeholder="Enter city or hotel"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="p-3 rounded-md border text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

      {/* Check-in & Check-out Group */}
  <div className="flex flex-col md:flex-row gap-4 w-full col-span-1 md:col-span-2">
    {/* Check-in */}
    <div className="flex flex-col relative w-full">
      <label className="text-gray-700 mb-1 font-medium">Check-in</label>
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className={`w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
          !checkIn ? "text-gray-500" : "text-black"
        }`}
      />
      {!checkIn && (
        <span className="md:hidden absolute left-3 top-10 text-gray-500 pointer-events-none">
          dd-mm-yyyy
        </span>
      )}
    </div>

    {/* Check-out */}
    <div className="flex flex-col relative w-full">
      <label className="text-gray-700 mb-1 font-medium">Check-out</label>
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className={`w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
          !checkOut ? "text-gray-500" : "text-black"
        }`}
      />
      {!checkOut && (
        <span className="md:hidden absolute left-3 top-10 text-gray-500 pointer-events-none">
          dd-mm-yyyy
        </span>
      )}
    </div>
  </div>
        {/* </div> */}

        {/* Search Button */}
        <button
          type="submit"
          className="w-full border border-gray-700 text-gray-700  py-3 px-4 rounded-md hover:bg-black hover:text-white transition"
        >
          Search
        </button>
      </form>
    </section>
  );
}
