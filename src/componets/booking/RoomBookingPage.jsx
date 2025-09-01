"use client";
import { useState, useEffect } from "react";
import FormData from "@/componets/booking/FromData"
export default function BookingPage() {
  const [bookingData, setBookingData] = useState(null);


  // Fetch booking data from localStorage
  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data) setBookingData(JSON.parse(data));
  }, []);

  if (!bookingData) return <p>Loading...</p>;

  // Destructure data for easy use
  const { checkIn, checkOut, nights, rooms, adults, totalPrice, child } = bookingData;

  return (
    <div className="max-w-7xl mx-auto bg-white text-black px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Guest Form */}
           <FormData/>


        {/* Right: Booking Summary */}
        <div className="bg-gray-50 p-6 rounded-lg shadow space-y-4">
          <h3 className="font-semibold text-lg mb-2">Your Booking Details</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span>Check-in</span>
            <span>{new Date(checkIn).toDateString()}</span>
            <span>Check-out</span>
            <span>{new Date(checkOut).toDateString()}</span>
            <span>Total nights</span>
            <span>{nights}</span>
          </div>

          <p className="text-md">
            You selected: {rooms} room(s) for {adults} adult(s)  child(s) {child} 
          </p>

          <div className="bg-white p-4 rounded border">
            <h4 className="font-semibold">Your price summary</h4>
            <p className="text-2xl font-bold">₹ {totalPrice}</p>
            <p className="text-xs text-gray-500">Includes taxes and charges</p>
          </div>
        </div>
      </div>
    </div>
  );
}
