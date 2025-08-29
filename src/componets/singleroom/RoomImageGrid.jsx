

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";
import SearchBox from "../home/SearchBox";




export default function RoomImageGrid(roomData) {
  
  
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openSlider = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeSlider = () => {
    setIsOpen(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? roomData?.data?.image.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % roomData?.data?.image.length);
  };



  return (
   <>
    <div className="grid md:grid-cols-2 gap-6">
      {/* Left: Image Grid */}
  <div className="grid grid-cols-3 grid-rows-2 gap-2">
  {/* Main image big */}
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

  {/* Next 2 small images */}
  {roomData?.data?.image?.slice(1, 3).map((img, index) => (
    <img
      key={index + 1}
      src={img}
      alt={`Room ${index + 1}`}
      onClick={() => openSlider(index + 1)}
      className="cursor-pointer w-full h-full object-cover rounded-md"
    />
  ))}

  {/* Last grid cell with overlay */}
  {roomData?.data?.image?.length > 3 && (
    <div
      className="relative cursor-pointer w-full h-full"
      onClick={() => openSlider(3)}
    >
      <img
        src={roomData?.data?.image[3]} // show the 4th image
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


      {/* Right: Hotel Info */}
      <div className="space-y-4  "> 
         <p className="flex gap-2 text-gray-500 mb-[0px]"> ⭐️⭐️⭐️  👍</p>
        <h2 className="text-2xl text-gray-800 font-bold">{roomData?.data?.name}</h2>
         <p className="flex gap-2 text-gray-500"> <IoLocationSharp /> {roomData?.data?.roomLocation}</p>
        <p className="text-gray-700 text-justify">
         {roomData?.data?.description}
        </p>
        <p className="text-gray-700 text-justify">
         <span className="text-gray-600 font-semibold">Essential Facilities: </span>{roomData?.data?.facilities}
        </p>
        

          {/* Amenities  */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {roomData?.data?.roomAmenities?.map((facility, index) => (
        <div
          key={index}
          className="flex items-center gap-2 border border-gray-600 rounded-lg px-3 py-2 hover:shadow hover:bg-gray-50 transition"
        >
          {/* <img
            src={facility}
            alt={facility.name}
            className="w-5 h-5 object-contain"
          /> */}
          <span className="text-sm text-gray-700">{facility} </span>
        </div>


      ))}
       </div>


        <div className="text-lg font-semibold text-green-600  ">
         <span>   &#8377; {roomData?.data?.price} / night</span>
          <Link href={`/hotel/room/${roomData?.data?.id}/booking`}>
          <span className="bg-green-700 hover:bg-green-900 float-end text-white p-2 rounded">Reserve</span>
          </Link>

        {/* <CheckAvailbilty/> */}
        

        </div>
      </div>

      {/* Modal Slider */}
      <Dialog open={isOpen} onClose={closeSlider} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-80" aria-hidden="true" />
        <div className="fixed inset-0  md:ml-[0px]  w-[17rem] md:w-full flex items-center md:justify-center ">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeSlider}
              className="absolute top-0 right-[-40px] md:right-22 text-red-600 z-10"
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
                className="max-h-[100vh] w-full  object-contain mx-auto rounded"
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
      <SearchBox/>
   </>
  );
}
