"use client";

import { useState } from "react";
import {
  FiSearch,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import AdminProfileSideBar from "../admin-dasboard/AdminProfileSideBar";

// Dummy queries data
const initialQueries = [
  {
    id: "q1",
    corporate: "Tech Mahindra",
    subject: "Annual Conference Booking",
    message:
      "We want to book 100 rooms for our annual conference. Please confirm availability.",
    date: "2025-09-05",
  },
  {
    id: "q2",
    corporate: "HDFC Bank",
    subject: "Corporate Discount Inquiry",
    message: "Need details about corporate discount plans for 2025.",
    date: "2025-09-06",
  },
  {
    id: "q3",
    corporate: "Tata Steel",
    subject: "Partnership Proposal",
    message: "Interested in long term stay tie-up. Share proposal.",
    date: "2025-09-07",
  },
];

export default function AdminCorporateAllUser() {
  const [queries, setQueries] = useState(initialQueries);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = queries.filter(
    (query) =>
      query.corporate.toLowerCase().includes(q.toLowerCase()) ||
      query.subject.toLowerCase().includes(q.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (id) => {
    const query = queries.find((q) => q.id === id);
    if (!query) return;
    const ok = confirm(`Delete query from "${query.corporate}" ?`);
    if (!ok) return;
    setQueries((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="min-h-screen pt-16 pb-20 text-black bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-2">
          <p className="pb-5 font-bold text-3xl">Admin Dashboard</p>
          <AdminProfileSideBar user={{ name: "Admin" }} />
        </aside>

        {/* Main */}
        <main className="lg:col-span-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">
                Corporate Queries
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage all incoming queries from corporates
              </p>
            </div>

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
                placeholder="Search by corporate or subject"
              />
            </div>
          </div>

          {/* Table (Desktop) */}
  <div className="hidden lg:block bg-white rounded-lg shadow p-4 md:p-6">
  <div className="overflow-x-auto">
    <table className="w-full table-auto min-w-[1500px]">
      <thead className="sticky top-0 bg-white z-10">
        <tr className="text-left text-sm text-gray-500 border-b">
          <th className="py-3 px-2 w-40">Name</th>
          <th className="py-3 px-2 w-56">Email</th>
          <th className="py-3 px-2 w-32">Phone</th>
          <th className="py-3 px-2 w-48">Organization</th>
          <th className="py-3 px-2 w-32">Check-In</th>
          <th className="py-3 px-2 w-32">Check-Out</th>
          <th className="py-3 px-2 w-24">Room</th>
          <th className="py-3 px-2 w-64">Message</th>
          <th className="py-3 px-2 w-24 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {pageItems.map((query) => (
          <tr key={query.id} className="border-b last:border-b-0">
            <td className="py-4 px-2 font-medium whitespace-nowrap w-40">{query.corporate}</td>
            <td className="py-4 px-2 whitespace-nowrap w-56">{query.subject}</td>
            <td className="py-4 px-2 whitespace-nowrap w-32">{query.phone}</td>
            <td className="py-4 px-2 whitespace-nowrap w-48">{query.organization}</td>
            <td className="py-4 px-2 whitespace-nowrap w-32">{query.checkIn}</td>
            <td className="py-4 px-2 whitespace-nowrap w-32">{query.checkOut}</td>
            <td className="py-4 px-2 whitespace-nowrap w-24">{query.room}</td>
            <td className="py-4 px-2 max-w-xs truncate w-64">{query.message}</td>
            <td className="py-4 px-2 text-right w-24">
              <button
                onClick={() => handleDelete(query.id)}
                className="p-2 rounded hover:bg-red-50 text-red-500"
              >
                <FiTrash2 />
              </button>
            </td>
          </tr>
        ))}
        {pageItems.length === 0 && (
          <tr>
            <td colSpan={9} className="py-8 text-center text-gray-500">
              No queries found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>




          {/* Card View (Mobile + Tablet) */}
          <div className="lg:hidden grid grid-cols-1 gap-4">
            {pageItems.map((query) => (
              <article
                key={query.id}
                className="bg-white border rounded-lg shadow-sm p-4"
              >
                <h3 className="font-semibold text-lg">{query.corporate}</h3>
                <p className="text-sm text-gray-600">{query.subject}</p>
                <p className="mt-2 text-gray-700 text-sm">{query.message}</p>
                <p className="text-xs text-gray-400 mt-2">{query.date}</p>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => handleDelete(query.id)}
                    className="px-3 py-1 bg-red-100 text-red-500 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing <strong>{(page - 1) * perPage + 1}</strong> -{" "}
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
