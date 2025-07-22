// pages/coming-soon.js
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const partners = [
  "/file.svg",
  "/soonbg.jpg",
  "/soonbg.jpg",
  "/soonbg.jpg",
  
];

export default function ComingSoon() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % partners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [paused]);

  const handlePrev = () => setCurrent((current - 1 + partners.length) % partners.length);
  const handleNext = () => setCurrent((current + 1) % partners.length);

  return (
   <>
    <div
            className="relative max-w-2xl mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="flex items-center justify-center mb-2">
              <button onClick={handlePrev} className="mr-4 text-xl">
                <FaChevronLeft />
              </button>
              <Image
                src={partners[current]}
                alt="Partner Logo"
                width={300}
                height={70}
                className="rounded-lg border"
              />
              <button onClick={handleNext} className="ml-4 text-xl">
                <FaChevronRight />
              </button>
            </div>
          </div>
    {/* <div className="min-h-screen bg-gray-100 py-10 px-4 text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mt-12">
          

         
        </div>

        <footer className="mt-16 text-sm text-gray-500">
          <p>Contact us: info@hotelindelhi.com | +91-9971522879</p>
        </footer>
      </div>
    </div> */}
   </>
  );
}
