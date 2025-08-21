"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ReviewCard() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const reviewsPerPage = 6;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let res = await fetch("/api/review", { method: "GET" });
        res = await res.json();
        console.log("Fetched Reviews:", res);
        if (res.success) {
          setReviews(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, []);

  // Pagination calculation
  const startIndex = (page - 1) * reviewsPerPage;
  const visibleReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  return (
    <>
      {/* Review Button */}
      <div className="text-sm mt-[-25px]  float-end rounded hover:bg-green-700 bg-green-600 text-gray-100 flex items-center gap-1 cursor-pointer">
        <Link href="/review" className="p-3 ">
          Review
        </Link>
      </div>

      {/* Reviews */}
      {visibleReviews?.map((item, index) => {
        return (
          <div
            key={index}
            className="rounded p-4 mt-8 shadow-sm max-w-6xl mx-auto"
          >
            {/* Top Section: Avatar + Name + Rating */}
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                {/* Profile image */}
                <Image
                  src={item.profileImage || "/user.jpg"}
                  alt="User"
                  width={40}
                  height={35}
                  className="rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {item.name}
                    <span className="text-gray-500 font-normal pl-2 text-xs">
                      {" "}
                      (Stayed{" "}
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                      )
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">{`${item.group} | ${item.rating} Reviews Written`}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-teal-600 text-white text-sm px-2 py-1 rounded font-bold h-fit">
                {`${item.rating}/5`}
              </div>
            </div>

            {/* Review Text */}
            <p className="mt-4 text-sm text-gray-700">{item.message}</p>

            {/* Review Images */}
            <div className="flex gap-3 mt-4 flex-wrap">
              {item.reviewImages?.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`room-${i}`}
                  width={120}
                  height={70}
                  className="rounded-md md:h-25 h-[60px] w-[60px]  md:w-27 object-cover border"
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded bg-gray-200  text-black disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={startIndex + reviewsPerPage >= reviews.length}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
