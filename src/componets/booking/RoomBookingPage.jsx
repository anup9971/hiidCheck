"use client";
import { useState, useEffect } from "react";

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
 <form className="lg:col-span-2 space-y-6 bg-white p-6 rounded-lg shadow">
  <h2 className="text-2xl font-semibold mb-4">Guest Information</h2>

  {/* Name Field */}
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
      Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Name"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2"
      required
    />
  </div>

  {/* Email Field */}
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      Email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="example@gmail.com"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2"
      required
    />
  </div>

  {/* Phone Field */}
  <div>
    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
      Phone
    </label>
    <input
      type="tel"
      id="phone"
      name="phone"
      placeholder="+91 98345 67890"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2"
      required
    />
  </div>

  {/* Address Field */}
  <div>
    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
      Address
    </label>
    <textarea
      id="address"
      name="address"
      placeholder="123 Main St, City, Delhi"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2"
      rows={3}
      required
    />
  </div>

  <button className="w-full bg-white border text-black hover:bg-black hover:text-white py-3 rounded text-lg">
    Book Now
  </button>
</form>


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
