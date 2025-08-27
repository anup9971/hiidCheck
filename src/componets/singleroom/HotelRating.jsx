"use client";
import { Star, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReviewCard from "./ReviewCard";

const keywords = [
  { text: "courteous staff", count: 266, color: "green" },
  { text: "good stay", count: 181, color: "green" },
  { text: "good room", count: 173, color: "green" },
  { text: "great food", count: 96, color: "green" },
  { text: "great location", count: 94, color: "green" },
  { text: "near aero city metro station", count: 67, color: "orange" },
];

const ratings = [
  { stars: 5, count: 1621 },
  { stars: 4, count: 866 },
  { stars: 3, count: 324 },
  { stars: 2, count: 190 },
  { stars: 1, count: 274 },
];

export default function HotelRating(roomData) {
  const totalRatings = 3275;
  const totalReviews = 1071;
  const maxCount = ratings[0].count;

  return (
    <>
    <div className="max-w-7xl bg-gray-50  rounded mt-5 md:mt-10 mx-auto px-4 py-8">
      {/* Heading + Sort */}
      <div className=" md:flex justify-between items-start md:items-center mb-4">
        {/* for  Mobile scree */}
         {/* <div className="text-sm text-gray-700 flex items-center gap-1 cursor-pointer">
          Sort By: <span className="font-medium text-black">Latest first</span>
          <ChevronDown size={16} />
        </div> */}
        <h2 className="text-xl font-semibold text-gray-800">
          Guest Reviews & Rating for {roomData?.data?.name}
        </h2>
        
        {/* for desktop  */}
        {/* <div className="text-sm text-gray-700 flex items-center gap-1 cursor-pointer">
          Sort By: <span className="font-medium text-black">Latest first</span>
          <ChevronDown size={16} />
        </div> */}
      </div>

      <div className="flex flex-col md:flex-row bg-gray-50   rounded-lg p-6 gap-8">
        {/* Left: Rating + Bars */}
        <div className="md:w-1/2 flex flex-col gap-6">
          {/* Green Rating Box */}
          <div className="bg-green-600 text-white p-5 rounded-lg md:w-40 text-center">
            <div className="text-sm font-medium">HiDRating</div>
            <div className="text-3xl font-bold">4.1<span className="text-base">/5</span></div>
            <div className="text-xs mt-1">{totalRatings} Ratings</div>
            <div className="text-xs">{totalReviews} Reviews</div>
          </div>

          {/* Star Rating Bars */}
          <div className="space-y-3">
            {ratings.map((r) => {
              const percent = (r.count / maxCount) * 100;
              let barColor = "bg-green-600";
              if (r.stars === 3) barColor = "bg-yellow-400";
              else if (r.stars <= 2) barColor = "bg-red-500";

              return (
                <div key={r.stars} className="flex items-center gap-2">
                  <div className="w-8 flex text-black items-center text-sm">
                    {r.stars}
                    <Star size={12} fill="black" stroke="black" className="ml-1" />
                  </div>
                  <div className="flex-1 bg-gray-200 h-2 rounded">
                    <div
                      className={`${barColor} h-2 rounded`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <div className="w-10  text-black text-sm text-right">{r.count}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Keyword Tags */}
        <div className="md:w-1/2">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">What our guests say?</h4>
          <div className="flex flex-wrap gap-2">
            {keywords.map((k, i) => (
              <span
                key={i}
                className={`text-sm px-3 py-1 rounded-md border ${
                  k.color === "green"
                    ? "border-green-500 text-green-700"
                    : "border-orange-400 text-orange-600"
                }`}
              >
                {k.text} ({k.count})
              </span>
            ))}
            <button className="text-sm px-3 py-1 rounded-md border border-green-500 text-green-700">
              + 6 more
            </button>
          </div>
        </div>
      </div>




{/* ------------------------------------------ Review Section ---------------------------------------- */}

<ReviewCard/>


    </div>

  
    </>
  );
}
