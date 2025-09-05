"use client"
import React, { useState } from "react";
export default function UserBookingProfile() {
  // Mock user & bookings data (replace with API calls)
  const user = {
    name: "Ankit Kumar",
    email: "ankit@example.com",
    phone: "+91 98765 6335",
    avatar: "https://i.pravatar.cc/150?img=12",
    memberSince: "Jan 2023",
  };

  const initialBookings = [
    {
      id: "BK-1001",
      hotel: "The Grand Hotel",
      room: "Deluxe King",
      checkIn: "2025-09-10",
      checkOut: "2025-09-13",
      price: 7500,
      status: "Confirmed",
      guests: 2,
      img: "https://picsum.photos/seed/room1/400/300",
    },
    {
      id: "BK-1002",
      hotel: "Seaside Resort",
      room: "Sea View Suite",
      checkIn: "2025-10-01",
      checkOut: "2025-10-05",
      price: 18000,
      status: "Cancelled",
      guests: 3,
      img: "https://picsum.photos/seed/room2/400/300",
    },
    {
      id: "BK-1003",
      hotel: "City Inn",
      room: "Standard Double",
      checkIn: "2025-11-20",
      checkOut: "2025-11-22",
      price: 4200,
      status: "Pending",
      guests: 1,
      img: "https://picsum.photos/seed/room3/400/300",
    },
  ];

  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const statusColors = {
    Confirmed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  function filteredBookings() {
    return bookings.filter((b) => {
      const matchesFilter = filter === "All" ? true : b.status === filter;
      const matchesQuery =
        query.trim() === "" ||
        b.hotel.toLowerCase().includes(query.toLowerCase()) ||
        b.id.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }


  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">My Bookings</h1>
          <div className="hidden md:flex gap-3 items-center">
            <button className="px-4 py-2 bg-white shadow rounded text-sm">Edit Profile</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded text-sm">New Booking</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Card (left column) */}
          <aside className="col-span-1 bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="font-medium text-lg">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.phone}</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600 space-y-2">
              <p>
                <span className="font-medium">Member since: </span>
                {user.memberSince}
              </p>
              <p>
                <span className="font-medium">Total bookings: </span>
                {bookings.length}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <button className="px-3 py-2 bg-gray-100 rounded text-sm">Profile</button>
              <button className="px-3 py-2 bg-gray-100 rounded text-sm">Payments</button>
              <button className="px-3 py-2 bg-gray-100 rounded text-sm">Messages</button>
              <button className="px-3 py-2 bg-gray-100 rounded text-sm">Settings</button>
            </div>
          </aside>
       
        </div>

      
      
      </div>
    </div>
  );
}
