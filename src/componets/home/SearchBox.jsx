"use client";

import { useSearch } from "@/app/context/SearchContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const router = useRouter();
  const { searchData, setSearchData } = useSearch();
  const [error, setError] = useState("");

  // Date defaults
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (!searchData.checkIn)
      setSearchData((prev) => ({
        ...prev,
        checkIn: today.toISOString().split("T")[0],
      }));

    if (!searchData.checkOut)
      setSearchData((prev) => ({
        ...prev,
        checkOut: tomorrow.toISOString().split("T")[0],
      }));
  }, []);

  const LIMITS = {
    adult: { min: 1, max: 2 },
    child: { min: 0, max: 1 },
    room: { min: 1, max: 3 },
  };

  const updateValue = (type, action) => {
    let current = searchData[type];
    let { min, max } = LIMITS[type] || {};
    let newValue = action === "minus" ? current - 1 : current + 1;

    if (newValue < min) return alert(`${type} cannot be less than ${min}`);
    if (newValue > max) return alert(`${type} cannot be more than ${max}`);

    setSearchData({ ...searchData, [type]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchData.checkIn || !searchData.checkOut) {
      setError("Please select both Check-in and Check-out dates!");
      return;
    }
    setError("");
    router.push("/search");
  };

  // Disable past dates
  const todayStr = new Date().toISOString().split("T")[0];
  const checkOutMin = searchData.checkIn || todayStr;

  return (
    <section className="w-full text-black py-10 px-4 md:px-12 lg:px-24">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-4 items-end bg-gray-100 p-6 rounded-xl shadow-lg"
      >
        {/* Check-in */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Check-in</label>
          <input
            type="date"
            value={searchData.checkIn}
            min={todayStr}
            onChange={(e) => {
              const newCheckIn = e.target.value;
              let newCheckOut = searchData.checkOut;

              // Ensure check-out is after check-in
              if (new Date(newCheckOut) <= new Date(newCheckIn)) {
                const nextDay = new Date(newCheckIn);
                nextDay.setDate(nextDay.getDate() + 1);
                newCheckOut = nextDay.toISOString().split("T")[0];
              }

              setSearchData({
                ...searchData,
                checkIn: newCheckIn,
                checkOut: newCheckOut,
              });
            }}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Check-out */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Check-out</label>
          <input
            type="date"
            value={searchData.checkOut}
            min={checkOutMin}
            onChange={(e) =>
              setSearchData({ ...searchData, checkOut: e.target.value })
            }
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Adult */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Adult</label>
          <div className="flex items-center justify-between h-[50px] border border-gray-300 rounded-md px-3">
            <button
              type="button"
              onClick={() => updateValue("adult", "minus")}
              className="p-2 hover:bg-gray-200 rounded"
            >
              <FaMinus />
            </button>
            <span className="font-medium">{searchData.adult}</span>
            <button
              type="button"
              onClick={() => updateValue("adult", "plus")}
              className="p-2 hover:bg-gray-200 rounded"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Child */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Child</label>
          <div className="flex items-center justify-between h-[50px] border border-gray-300 rounded-md px-3">
            <button
              type="button"
              onClick={() => updateValue("child", "minus")}
              className="p-2 hover:bg-gray-200 rounded"
            >
              <FaMinus />
            </button>
            <span className="font-medium">{searchData.child}</span>
            <button
              type="button"
              onClick={() => updateValue("child", "plus")}
              className="p-2 hover:bg-gray-200 rounded"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Room */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Room</label>
          <div className="flex items-center justify-between h-[50px] border border-gray-300 rounded-md px-3">
            <button
              type="button"
              onClick={() => updateValue("room", "minus")}
              className="p-2 hover:bg-gray-200 rounded"
            >
              <FaMinus />
            </button>
            <span className="font-medium">{searchData.room}</span>
            <button
              type="button"
              onClick={() => updateValue("room", "plus")}
              className="p-2 hover:bg-gray-200 rounded"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full md:col-span-1 border border-gray-700 text-gray-700 py-3 px-4 rounded-md hover:bg-black hover:text-white transition"
        >
          Search
        </button>

        {/* Error Message */}
        {error && <p className="col-span-6 text-red-600 text-sm">{error}</p>}
      </form>
    </section>
  );
}
