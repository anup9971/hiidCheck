"use client";

import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import {
  FiEdit,
  FiSearch,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import OwnerProfileSideBar from "../ownerProfileDashboard/OwnerProfileSideBar";
// import AdminProfileSideBar from "../admin-dasboard/AdminProfileSideBar";

// Dummy hotel data
const initialHotels = [
  {
    id: "h1",
    name: "The Grand Plaza",
    location: "New Delhi, India",
    capacity: 200,
    rooms: 120,
    rating: 4.6,
    status: "published",
    pricePerNight: 7500,
    image: "/hotel/hotel1.jpg",
    amenities: ["Wi-Fi", "Pool", "Restaurant", "Parking"],
  },
  {
    id: "h2",
    name: "Oceanview Resort",
    location: "Goa, India",
    capacity: 150,
    rooms: 80,
    rating: 4.2,
    status: "published",
    pricePerNight: 5800,
    image: "/hotel/hotel2.jpg",
    amenities: ["Beach Access", "Spa", "Bar"],
  },
  {
    id: "h3",
    name: "Business Inn",
    location: "Mumbai, India",
    capacity: 300,
    rooms: 200,
    rating: 4.7,
    status: "published",
    pricePerNight: 9200,
    image: "/hotel/hotel3.jpg",
    amenities: ["Conference Hall", "Wi-Fi", "Gym"],
  },
  {
    id: "h4",
    name: "Heritage Stay",
    location: "Jaipur, India",
    capacity: 80,
    rooms: 40,
    rating: 4.1,
    status: "published",
    pricePerNight: 4200,
    image: "/hotel/hotel4.jpg",
    amenities: ["Heritage tours", "Restaurant"],
  },
];

function useFilteredSorted(hotels, { q, status, sortBy }) {
  return useMemo(() => {
    let list = [...hotels];

    if (q?.trim()) {
      const term = q.trim().toLowerCase();
      list = list.filter(
        (h) =>
          h.name.toLowerCase().includes(term) ||
          h.location.toLowerCase().includes(term)
      );
    }

    if (status && status !== "all") {
      list = list.filter((h) => h.status === status);
    }

    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "price") list.sort((a, b) => a.pricePerNight - b.pricePerNight);

    return list;
  }, [hotels, q, status, sortBy]);
}

export default function AdminHotelsPage() {
  
  const [hotels, setHotels] = useState(initialHotels);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const perPage = 6;
  const router = useRouter();
  const [user] = useState({ name: "Admin" });

  const filtered = useFilteredSorted(hotels, { q, status, sortBy });
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (id) => {
    const hotel = hotels.find((h) => h.id === id);
    if (!hotel) return;
    const ok = confirm(`Delete "${hotel.name}"? This action cannot be undone.`);
    if (!ok) return;
    setHotels((prev) => prev.filter((h) => h.id !== id));
  };

  const handleToggleStatus = (id) => {
    setHotels((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, status: h.status === "published" ? "draft" : "published" }
          : h
      )
    );
  };



  return (
    <div className="min-h-screen  mt-[-4px] pt-15 pb-20 md:pt-20 md:pb-25  text-black bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sidebar */}
        <aside className="order-1 lg:col-span-2 lg:order-1 mb-6 lg:mb-0">
          <p className="pb-5 font-bold text-3xl">Owner Profile</p>
          <OwnerProfileSideBar user={user}/>
        </aside>

        {/* Main Content */}
        <main className="order-2 lg:col-span-4 lg:order-2">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">All Hotels</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage hotels — view, edit, or delete
              </p>
            </div>

            {/* Search & Filters */}
            <div className="flex items-center gap-3 flex-wrap">
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
                  placeholder="Search by name or location"
                />
              </div>

              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="border rounded-lg px-3 py-2 bg-white"
              >
                <option value="all">All status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-lg shadow p-4 md:p-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="py-3">Hotel</th>
                  <th className="py-3">Location</th>
                  <th className="py-3">Rooms</th>
                  <th className="py-3">Price / night</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((h) => (
                  <tr key={h.id} className="border-b last:border-b-0">
                    <td className="py-4 flex items-center gap-3">
                      <img
                        src={h.image}
                        alt={h.name}
                        className="w-16 h-12 rounded object-cover"
                      />
                      <span className="font-medium">{h.name}</span>
                    </td>
                    <td className="py-4">{h.location}</td>
                    <td className="py-4">{h.rooms}</td>
                    <td className="py-4">₹{h.pricePerNight}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          h.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {h.status}
                      </span>
                    </td>
                    <td className="py-4 text-right flex justify-end gap-2">
                      {/* <button
                        onClick={() => handleToggleStatus(h.id)}
                        className={`px-3 py-1 rounded text-white ${
                          h.status === "published"
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {h.status === "published" ? "Draft" : "Publish"}
                      </button> */}
                      <button
                        title="Edit"
                        onClick={() => router.push(`owner-update-property/${h.id}`)}
                        className="p-2 rounded hover:bg-gray-100"
                      >
                        <FiEdit />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(h.id)}
                        className="p-2 rounded hover:bg-red-50 text-red-500"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}

                {pageItems.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      No hotels found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile & Tablet Card Grid */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pageItems.map((h) => (
              <article
                key={h.id}
                className="bg-white border rounded-lg shadow-sm overflow-hidden"
              >
                <img
                  src={h.image}
                  alt={h.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold">{h.name}</h3>
                  <p className="text-sm text-gray-500">{h.location}</p>
                  <div className="flex justify-between mt-2 text-sm text-gray-700">
                    <span>Rooms: {h.rooms}</span>
                    <span>₹{h.pricePerNight}</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() => router.push(`owner-update-property/${h.id}`)}
                      className="px-3 py-1 bg-gray-100 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(h.id)}
                      className="px-3 py-1 bg-red-100 text-red-500 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {pageItems.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-500">
                No hotels found.
              </div>
            )}
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
