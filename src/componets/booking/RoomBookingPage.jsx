"use client";
import { useState, useEffect } from "react";

export default function BookingPage({ roomData }) {
  
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  // Guest info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("India");
  const [mainGuest, setMainGuest] = useState(true);
  const [travellingForWork, setTravellingForWork] = useState(null);

  // Booking info
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);

  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate price (dummy example)
//   useEffect(() => {
//     const nights =
//       (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
//     const pricePerNight = roomData.price || 22000;
//     setTotalPrice((pricePerNight * nights * rooms).toFixed(2));
//   }, [checkIn, checkOut, adults, rooms, roomData.price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("Please fill all required fields.");
      return;
    }
    alert(`Booking Successful! Total Price: ₹${totalPrice}`);
  };

  return (
    <div className="max-w-7xl mx-auto bg-white text-black px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Guest Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 space-y-6 bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">Guest Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name *"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border p-3 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <input
              type="tel"
              placeholder="Phone Number *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-3 rounded"
              required
            />
              <input
              type="tel"
              placeholder="Address"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-3 rounded"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <p>Who are you booking for? (optional)</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={mainGuest}
                  onChange={() => setMainGuest(true)}
                />
                I am the main guest
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!mainGuest}
                  onChange={() => setMainGuest(false)}
                />
                Booking is for someone else
              </label>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <p>Are you travelling for work? (optional)</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={travellingForWork === true}
                  onChange={() => setTravellingForWork(true)}
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={travellingForWork === false}
                  onChange={() => setTravellingForWork(false)}
                />
                No
              </label>
            </div>
          </div>

          <button className="w-full bg-white border text-black hover:bg-black hover:text-white  py-3 rounded text-lg">
            Reserve Now
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
            <span>
              {(new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)}
            </span>
          </div>

          <p className="text-sm">
            You selected: {rooms} room(s) for {adults} adult(s)
          </p>

          <div className="bg-white p-4 rounded border">
            <h4 className="font-semibold">Your price summary</h4>
            <p className="text-2xl font-bold">₹ {totalPrice}</p>
            <p className="text-xs text-gray-500">
              Includes taxes and charges
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
