"use client";

import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
} from "react-icons/fi";
import AdminProfileSideBar from "../admin-dasboard/AdminProfileSideBar";

// Dummy bookings data
const initialBookings = [
  {
    id: "b1",
    client: "Rahul Sharma",
    hotel: "The Grand Plaza",
    checkIn: "2025-09-12",
    checkOut: "2025-09-15",
    guests: 2,
    status: "confirmed",
    amount: 22500,
    paymentStatus: "paid",
  },
  {
    id: "b2",
    client: "Priya Verma",
    hotel: "Oceanview Resort",
    checkIn: "2025-09-20",
    checkOut: "2025-09-25",
    guests: 3,
    status: "pending",
    amount: 29000,
    paymentStatus: "unpaid",
  },
  {
    id: "b3",
    client: "Aman Gupta",
    hotel: "Business Inn",
    checkIn: "2025-10-05",
    checkOut: "2025-10-07",
    guests: 1,
    status: "cancelled",
    amount: 0,
    paymentStatus: "refunded",
  },
  {
    id: "b4",
    client: "Neha Singh",
    hotel: "Heritage Stay",
    checkIn: "2025-10-12",
    checkOut: "2025-10-15",
    guests: 4,
    status: "confirmed",
    amount: 16800,
    paymentStatus: "paid",
  },
];

function useFilteredSorted(bookings, { q, status, sortBy }) {
  return useMemo(() => {
    let list = [...bookings];

    // search
    if (q?.trim()) {
      const term = q.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.client.toLowerCase().includes(term) ||
          b.hotel.toLowerCase().includes(term)
      );
    }

    // status filter
    if (status && status !== "all") {
      list = list.filter((b) => b.status === status);
    }

    // sort
    if (sortBy === "client") list.sort((a, b) => a.client.localeCompare(b.client));
    if (sortBy === "amount") list.sort((a, b) => b.amount - a.amount);
    if (sortBy === "checkIn")
      list.sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));

    return list;
  }, [bookings, q, status, sortBy]);
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("checkIn");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = useFilteredSorted(bookings, { q, status, sortBy });
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (id) => {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;
    const ok = confirm(
      `Delete booking of "${booking.client}" at "${booking.hotel}" ?`
    );
    if (!ok) return;
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen pt-10 pb-15 mt-[-4px] md:pt-20 md:pb-20 text-black bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-2">
          <p className="text-black font-bold text-3xl mt-2 pb-2 ">Admin Profile</p>
          <AdminProfileSideBar user={{ name: "Admin" }} />
        </aside>

        {/* Content */}
        <main className="lg:col-span-4">
          {/* header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">
                Total Bookings
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage hotel bookings — view, delete or check status
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Search */}
              <div className="flex items-center border rounded-lg overflow-hidden bg-white">
                <div className="px-3 text-gray-400">
                  <FiSearch />
                </div>
                <input
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setPage(1);
                  }}
                  className="px-3 py-2 w-44 md:w-64 outline-none"
                  placeholder="Search by client or hotel"
                />
              </div>

              {/* Filters */}
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="border rounded-lg px-3 py-2 bg-white"
              >
                <option value="all">All status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white"
              >
                <option value="checkIn">Check-In</option>
                <option value="client">Client Name</option>
                <option value="amount">Amount</option>
              </select>
            </div>
          </div>

          {/* TABLE (Desktop) */}
          <div className="hidden lg:block bg-white rounded-lg shadow p-4 md:p-6">
           <div className="overflow-x-auto">
  <table className="w-full min-w-[1200px] table-auto">
    <thead>
      <tr className="text-left text-sm text-gray-500 border-b">
        <th className="py-3 w-80">Booking Id</th>
        <th className="py-3 w-40">Client</th>
        <th className="py-3 w-150">Hotel</th>
        <th className="py-3 w-100">Check-In</th>
        <th className="py-3 w-100">Check-Out</th>
        <th className="py-3 ">Guests</th>
        <th className="py-3 w-20">Amount</th>
        <th className="py-3 w-40">Status</th>
        <th className="py-3 w-40">Payment</th>
        <th className="py-3 text-right">Actions</th>
      </tr>
    </thead>
    <tbody>
      {pageItems.map((b) => (
        <tr key={b.id} className="border-b last:border-b-0">
          <td className="py-4 w-30 font-medium truncate">{b.id}</td>
          <td className="py-4  w-30 font-medium truncate">{b.client}</td>
          <td className="py-4 truncate">{b.hotel}</td>
          <td className="py-4">{b.checkIn}</td>
          <td className="py-4">{b.checkOut}</td>
          <td className="py-4 w-80">{b.guests}</td>
          <td className="py-4">₹{b.amount}</td>
          <td className="py-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              b.status === "confirmed" ? "bg-green-100 text-green-700" :
              b.status === "pending" ? "bg-yellow-100 text-yellow-700" :
              "bg-red-100 text-red-700"
            }`}>{b.status}</span>
          </td>
          <td className="py-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              b.paymentStatus === "paid" ? "bg-green-100 text-green-700" :
              b.paymentStatus === "unpaid" ? "bg-yellow-100 text-yellow-700" :
              "bg-red-100 text-red-700"
            }`}>{b.paymentStatus}</span>
          </td>
          <td className="py-4 text-right">
            <div className="inline-flex items-center gap-2">
              {/* <button title="View" className="p-2 rounded hover:bg-gray-100"><FiEye /></button> */}
              <button onClick={() => handleDelete(b.id)} className="p-2 rounded hover:bg-red-50 text-red-500"><FiTrash2 /></button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          </div>

          {/* CARD grid (Mobile + Tablet) */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pageItems.map((b) => (
              <article
                key={b.id}
                className="bg-white border rounded-lg shadow-sm p-4"
              >
                <h3 className="font-semibold">{b.client}</h3>
                <p className="text-sm text-gray-500">{b.hotel}</p>
                <p className="text-sm text-gray-500">
                  {b.checkIn} → {b.checkOut}
                </p>
                <p className="text-sm text-gray-500">Guests: {b.guests}</p>
                <p className="text-sm font-medium">₹{b.amount}</p>
                <div className="flex justify-between items-center mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      b.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : b.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      b.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : b.paymentStatus === "unpaid"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-end items-center gap-2 mt-3">
                  <button className="px-2 py-1 rounded bg-gray-100 text-sm">
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="px-2 py-1 rounded bg-red-50 text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
            {pageItems.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-500">
                No bookings found.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <strong>{(page - 1) * perPage + 1}</strong> -{" "}
              <strong>{Math.min(page * perPage, filtered.length)}</strong> of{" "}
              <strong>{filtered.length}</strong>
            </div>
            <div className="inline-flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-2 rounded border bg-white disabled:opacity-50"
              >
                <FiChevronLeft />
              </button>
              <div className="px-3 py-2 rounded border bg-white">
                Page {page} / {totalPages}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-2 rounded border bg-white disabled:opacity-50"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
