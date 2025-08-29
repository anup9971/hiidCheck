"use client";
import React, { useState, useMemo } from "react";
import { Dialog } from "@headlessui/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";
import SearchBox from "../home/SearchBox";
import { useSearch } from "@/app/context/SearchContext";
import { useRouter } from "next/navigation";

export default function RoomImageGrid(roomData) {
  let router = useRouter();
  const { searchData } = useSearch();
  console.log(searchData,"dfdf");
  
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [meals, setMeals] = useState({
    breakfast: false,
    dinner: false,
  });

  // Meal handler
  const handleMealChange = (e) => {
    const { name, checked } = e.target;
    setMeals((prev) => ({ ...prev, [name]: checked }));
  };

  // Nights calculation
  const getNights = () => {
    if (!searchData?.checkIn || !searchData?.checkOut) return 0;
    const inDate = new Date(searchData.checkIn);
    const outDate = new Date(searchData.checkOut);
    const diffTime = outDate - inDate;
    return diffTime > 0 ? diffTime / (1000 * 3600 * 24) : 0;
  };

  const nights = getNights();

  // ✅ Total price calculation
  const totalPrice = useMemo(() => {
    if (!nights) return 0;

    const roomPrice =
      (roomData?.data?.price || 0) * nights * (searchData?.rooms || 1);

    let mealPrice = 0;
    if (meals.breakfast)
      mealPrice += (roomData?.data?.breakfast || 200) * (searchData?.adults || 1) * nights;
    if (meals.dinner)
      mealPrice += (roomData?.data?.dinner || 200) * (searchData?.adults || 1) * nights;

    const subTotal = roomPrice + mealPrice + searchData.room;
    const gst = subTotal * 0.12; // 12% GST
    return subTotal + gst;
  }, [nights, meals, searchData, roomData]);

  const handelBooking = () => {
    if (!searchData.checkIn || !searchData.checkOut) {
      return alert("Check-In Or Check-Out Date Is Required!");
    }
    router.push(`/hotel/room/${roomData?.data?.id}/booking`);
  };

  // Image slider functions
  const openSlider = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };
  const closeSlider = () => setIsOpen(false);
  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? roomData?.data?.image.length - 1 : prev - 1
    );
  };
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % roomData?.data?.image.length);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Image Grid */}
        <div className="grid grid-cols-3 grid-rows-2 gap-2">
          <div
            className="col-span-3 row-span-2 cursor-pointer"
            onClick={() => openSlider(0)}
          >
            <img
              src={roomData?.data?.image[0]}
              alt="Main Room"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          {roomData?.data?.image?.slice(1, 3).map((img, index) => (
            <img
              key={index + 1}
              src={img}
              alt={`Room ${index + 1}`}
              onClick={() => openSlider(index + 1)}
              className="cursor-pointer w-full h-full object-cover rounded-md"
            />
          ))}
          {roomData?.data?.image?.length > 3 && (
            <div
              className="relative cursor-pointer w-full h-full"
              onClick={() => openSlider(3)}
            >
              <img
                src={roomData?.data?.image[3]}
                alt="More Photos"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  +{roomData?.data?.image.length - 4} Photos
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="space-y-4">
          <p className="flex gap-2 text-gray-500"> ⭐️⭐️⭐️ 👍</p>
          <h2 className="text-2xl text-gray-800 font-bold">
            {roomData?.data?.name}
          </h2>
          <p className="flex gap-2 text-gray-500">
            <IoLocationSharp /> {roomData?.data?.roomLocation}
          </p>
          <p className="text-gray-700">{roomData?.data?.description}</p>
          <p className="text-gray-700">
            <span className="text-gray-600 font-semibold">
              Essential Facilities:{" "}
            </span>
            {roomData?.data?.facilities}
          </p>

          {/* Amenities */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {roomData?.data?.roomAmenities?.map((facility, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border border-gray-600 rounded-lg px-3 py-2 hover:shadow hover:bg-gray-50 transition"
              >
                <span className="text-sm text-gray-700">{facility}</span>
              </div>
            ))}
          </div>

          {/* Price + Meals + Reserve */}
          <div className="text-lg font-semibold text-green-600 space-y-3">
            <span>&#8377; {roomData?.data?.price} / night</span>
            <p className="text-gray-500 text-sm">+ 12% GST & Taxes</p>

            <div className="flex gap-6 text-gray-700 text-base">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="breakfast"
                  checked={meals.breakfast}
                  onChange={handleMealChange}
                  className="w-4 h-4"
                />
                Breakfast (+₹200/person)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="dinner"
                  checked={meals.dinner}
                  onChange={handleMealChange}
                  className="w-4 h-4"
                />
                Dinner (+₹200/person)
              </label>
            </div>

            {/* ✅ Show calculated total */}
            {nights > 0 && (
              <p className="text-gray-800">
                <span className="font-semibold">Total Price: </span>₹{" "}
                {totalPrice.toFixed(2)}
              </p>
            )}

            <button
              onClick={handelBooking}
              className="bg-green-700 hover:bg-green-900 float-end text-white p-2 rounded"
            >
              Reserve
            </button>
          </div>
        </div>

        {/* Modal Image Slider */}
        <Dialog open={isOpen} onClose={closeSlider} className="relative z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-80"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-4xl">
              <button
                onClick={closeSlider}
                className="absolute top-2 right-2 text-red-600 z-10"
              >
                <X size={28} />
              </button>
              <div className="flex items-center justify-between">
                <button
                  onClick={prevImage}
                  className="text-white bg-black bg-opacity-40 p-2 rounded-full"
                >
                  <ChevronLeft size={32} />
                </button>
                <img
                  src={roomData?.data?.image[currentIndex]}
                  alt="Room"
                  className="max-h-[90vh] w-full object-contain mx-auto rounded"
                />
                <button
                  onClick={nextImage}
                  className="text-white bg-black bg-opacity-40 p-2 rounded-full"
                >
                  <ChevronRight size={32} />
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </div>

      {/* SearchBox */}
      <SearchBox />
    </>
  );
}
