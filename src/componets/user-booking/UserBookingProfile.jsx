"use client"
import React, { useState } from "react";
import UserProfileSideBar from "../user-profile/UserProfileSideBar";


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

  function cancelBooking(id) {
    // In real app: call API, optimistic update or re-fetch
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b)));
    if (selected && selected.id === id) setSelected({ ...selected, status: "Cancelled" });
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">My Bookings</h1>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Card (left column) */}
          <UserProfileSideBar user={user}/>

          {/* Bookings list (main column) */}
          <main className="col-span-1 lg:col-span-3">
            {/* Search & Filters */}
            {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 w-full md:w-1/2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by hotel or booking id"
                  className="w-full px-3 py-2 border rounded-md bg-white text-sm"
                />
                <button
                  onClick={() => {
                    setQuery("");
                    setFilter("All");
                  }}
                  className="px-3 py-2 bg-gray-100 rounded"
                >
                  Reset
                </button>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-white text-sm"
                >
                  <option>All</option>
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>

                <div className="block md:hidden">
                  <button className="px-3 py-2 bg-indigo-600 text-white rounded text-sm">New</button>
                </div>
              </div>
            </div> */}

            {/* Booking cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredBookings().map((b) => (
                <article key={b.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-40 h-36 relative flex-shrink-0">
                      <img src={b.img} alt={b.hotel} className="w-full h-full object-cover" />
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{b.hotel}</h3>
                          <p className="text-sm text-gray-500">{b.room}</p>
                        </div>

                        <div className="text-right">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[b.status] || "bg-gray-100 text-gray-800"}`}>
                            {b.status}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                        <div>
                          <p>
                            <span className="font-medium">Check-in: </span>
                            {b.checkIn}
                          </p>
                          <p>
                            <span className="font-medium">Check-out: </span>
                            {b.checkOut}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold">₹{b.price}</p>
                          <p className="text-xs text-gray-500">{b.guests} guest(s)</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        {/* <button
                          onClick={() => setSelected(b)}
                          className="px-3 py-2 bg-indigo-50 border border-indigo-200 rounded text-sm"
                        >
                          View
                        </button> */}

                        {b.status !== "Cancelled" && (
                          <button
                            onClick={() => cancelBooking(b.id)}
                            className="px-3 py-2 bg-red-50 border border-red-200 text-red-600 rounded text-sm"
                          >
                            Cancel
                          </button>
                        )}

                        {/* <button className="ml-auto px-3 py-2 bg-gray-100 rounded text-sm">Receipt</button> */}
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {filteredBookings().length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-8">No bookings found.</div>
              )}
            </div>

            {/* Pagination placeholder */}
            <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
              <div>Showing {filteredBookings().length} bookings</div>
              <div className="space-x-2">
                <button className="px-3 py-1 border rounded">Prev</button>
                <button className="px-3 py-1 border rounded">Next</button>
              </div>
            </div>
          </main>
        </div>

        {/* Detail Drawer / Modal */}
        {/* {selected && (
          <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />

            <div className="relative bg-white w-full md:max-w-2xl rounded-t-lg md:rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 md:p-6">
                <div className="flex items-start gap-4">
                  <img src={selected.img} alt={selected.hotel} className="w-28 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{selected.hotel}</h3>
                    <p className="text-sm text-gray-500">{selected.room}</p>
                    <p className="text-sm text-gray-600 mt-2">Booking ID: {selected.id}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">₹{selected.price}</p>
                    <p className="text-xs text-gray-500">{selected.status}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div>
                    <p>
                      <span className="font-medium">Check-in: </span>
                      {selected.checkIn}
                    </p>
                    <p>
                      <span className="font-medium">Check-out: </span>
                      {selected.checkOut}
                    </p>
                    <p>
                      <span className="font-medium">Guests: </span>
                      {selected.guests}
                    </p>
                  </div>

                  <div>
                    <p>
                      <span className="font-medium">Hotel: </span>
                      {selected.hotel}
                    </p>
                    <p className="font-medium mt-2">Actions</p>
                    <div className="mt-2 flex gap-2">
                      {selected.status !== "Cancelled" && (
                        <button
                          onClick={() => {
                            cancelBooking(selected.id);
                          }}
                          className="px-3 py-2 bg-red-50 border border-red-200 text-red-600 rounded text-sm"
                        >
                          Cancel Booking
                        </button>
                      )}

                      <button
                        onClick={() => alert("Download receipt - replace with real functionality")}
                        className="px-3 py-2 bg-indigo-600 text-white rounded text-sm"
                      >
                        Download Receipt
                      </button>

                      <button onClick={() => setSelected(null)} className="px-3 py-2 bg-gray-100 rounded text-sm">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
