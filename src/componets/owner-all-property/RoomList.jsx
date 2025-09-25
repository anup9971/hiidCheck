"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  FiEdit,
  FiSearch,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import OwnerProfileSideBar from "../ownerProfileDashboard/OwnerProfileSideBar";
import ownerFechData from "@/app/admin/ownerFetchData";
import { formatDate } from "@/app/untils/formatDate";
import toast from "react-hot-toast";
// import AdminProfileSideBar from "../admin-dasboard/AdminProfileSideBar";
  
// Dummy hotel data
// const initialHotels = [
//   {
//     id: "h1",
//     name: "The Grand Plaza",
//     location: "New Delhi, India",
//     capacity: 200,
//     rooms: 120,
//     rating: 4.6,
//     status: "published",
//     pricePerNight: 7500,
//     image: "/hotel/hotel1.jpg",
//     amenities: ["Wi-Fi", "Pool", "Restaurant", "Parking"],
//   },
//   {
//     id: "h2",
//     name: "Oceanview Resort",
//     location: "Goa, India",
//     capacity: 150,
//     rooms: 80,
//     rating: 4.2,
//     status: "published",
//     pricePerNight: 5800,
//     image: "/hotel/hotel2.jpg",
//     amenities: ["Beach Access", "Spa", "Bar"],
//   },
//   {
//     id: "h3",
//     name: "Business Inn",
//     location: "Mumbai, India",
//     capacity: 300,
//     rooms: 200,
//     rating: 4.7,
//     status: "published",
//     pricePerNight: 9200,
//     image: "/hotel/hotel3.jpg",
//     amenities: ["Conference Hall", "Wi-Fi", "Gym"],
//   },
//   {
//     id: "h4",
//     name: "Heritage Stay",
//     location: "Jaipur, India",
//     capacity: 80,
//     rooms: 40,
//     rating: 4.1,
//     status: "published",
//     pricePerNight: 4200,
//     image: "/hotel/hotel4.jpg",
//     amenities: ["Heritage tours", "Restaurant"],
//   },
// ];

function useFilteredSorted(hotels, { q, status, sortBy }) {
  return useMemo(() => {
    let list = [...hotels];

    if (q?.trim()) {
      const term = q.trim().toLowerCase();
      list = list.filter(
        (h) =>
          h.hotel_name.toLowerCase().includes(term) ||
          h.hotel_address.toLowerCase().includes(term)
      );
    }

    if (status && status !== "all") {
      list = list.filter((h) => h.active === status);
    }

    if (sortBy === "name") list.sort((a, b) => a?.hotel_name.localeCompare(b.hotel_name));
    if (sortBy === "price") list.sort((a, b) => a?.starting_price - b.starting_price);

    return list;
  }, [hotels, q, status, sortBy]);
}

export default function AdminHotelsPage() {
  let {owner} =ownerFechData()
  console.log(owner?._id);
  
  const [hotels, setHotels] = useState([]);
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

 const handleDelete = async (_id) => {
  try {
    // Find hotel to delete
    const hotel = hotels.find((h) => h._id === _id);
    if (!hotel) return;

    // Confirm deletion
    const ok = confirm(`Delete "${hotel.hotel_name}"? This action cannot be undone.`);
    if (!ok) return;

    // Call API to delete
    const res = await fetch(`/api/hotels/${_id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete hotel");
    }

    // Optional: Remove deleted hotel from local state if you're displaying a list
    setHotels((prev) => prev.filter((h) => h._id !== _id));

    toast.success("Hotel deleted successfully!");
  } catch (error) {
    console.error("Error deleting hotel:", error);
    toast.error("Failed to delete hotel");
  }
};


useEffect(() => {
  if (!owner?._id) return;

  const getHotelData = async () => {
    try {
      const res = await fetch("/api/hotels");
      const data = await res.json();

      if (Array.isArray(data)) {  // check if it's an array
        const filterData = data.filter((hotel) => {
          return (
            hotel.ownerId == owner?._id 
           
          );
        });
       console.log(filterData);
            
        setHotels(filterData);
        console.log("Filtered Hotels:", filterData);
      }
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  getHotelData();
}, [owner]);




  return (
    <div className="min-h-screen  mt-[-4px] pt-15 pb-20 md:pt-20 md:pb-25  text-black bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sidebar */}
        <aside className="order-1 md:w-95 lg:col-span-2 lg:order-1 mb-6 lg:mb-0">
          <p className="pb-5 font-bold text-3xl">Owner Profile</p>
          <OwnerProfileSideBar owner={owner} formatDate={formatDate}/>
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

              {/* <select
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
              </select> */}

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
                  <th className="py-3">Rating</th>
                  <th className="py-3">Price </th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((h) => (
                  <tr key={h._id} className="border-b last:border-b-0">
                    <td className="py-4 flex items-center gap-3">
                      <img
                        src={h.hotelImage[0]}
                        alt={h.hotel_name}
                        className="w-16 h-12 rounded object-cover"
                      />
                      <span className="font-medium">{h?.hotel_name}</span>
                    </td>
                    <td className="py-4">{h?.hotel_address}</td>
                    <td className="py-4">{h?.rating}</td>
                    <td className="py-4">₹{h?.starting_price}</td>
                    <td className="py-4">
                      <span
                         className={`px-3 py-1 rounded-full text-sm ${
                           h.isActive === true || h.isActive === "true"
                             ? "bg-green-100 text-green-700"
                             : "bg-yellow-100 text-yellow-700"
                         }`}
                       >
                         {h.isActive === true || h.isActive === "true" ? "Published" : "Draft"}
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
                        onClick={() => router.push(`owner-update-hotel/${h._id}`)}
                        className="p-2 rounded hover:bg-gray-100"
                      >
                        <FiEdit />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(h._id)}
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
                key={h?._id}
                className="bg-white border rounded-lg shadow-sm overflow-hidden"
              >
                <img
                  src={h?.hotelImage[0]}
                  alt={h?.hotel_name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold">{h.hotel_name}</h3>
                  <p className="text-sm text-gray-500">{h.location}</p>
                  <div className="flex justify-between mt-2 text-sm text-gray-700">
                    <span>Rating: {h?.rating}</span>
                    <span>₹{h?.starting_price}</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() => router.push(`owner-update-hotel/${h._id}`)}
                      className="px-3 py-1 bg-gray-100 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(h._id)}
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
