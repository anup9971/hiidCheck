"use client";

import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import OwnerProfileSideBar from "../ownerProfileDashboard/OwnerProfileSideBar";
import { formatDate } from "@/app/untils/formatDate";

import ownerFechData from "@/app/admin/ownerFetchData";
export default function OwnerBookings() {
   let {owner}= ownerFechData()
  const initialBookings = [
    {
      _id: "b1",
      customerName: "John Doe",
      roomName: "Classic Room",
      checkIn: "2025-09-10",
      checkOut: "2025-09-12",
      guests: 2,
      status: "Pending",
      totalPrice: 3000,
    },
    {
      _id: "b2",
      customerName: "Jane Smith",
      roomName: "Deluxe Room",
      checkIn: "2025-09-15",
      checkOut: "2025-09-18",
      guests: 3,
      status: "Confirmed",
      totalPrice: 7500,
    },
  ];

  const profile = {
    name: "Ankit Kumar",
    email: "akumarrai45@gmail.com",
    phone: "8392823395",
    memberSince: "2023-08-01",
  };

  const [bookings, setBookings] = useState(initialBookings);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (booking) => {
    setEditingId(booking._id);
    setEditData(booking);
  };

  const handleSave = () => {
    setBookings(bookings.map((b) => (b._id === editingId ? editData : b)));
    setEditingId(null);
    alert("Booking updated!");
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter((b) => b._id !== id));
      alert("Booking deleted!");
    }
  };

  return (
    <div className="min-h-screen mt-[-4px] pt-15 pb-15 bg-gray-100 text-black">
      {/* Desktop / Tablet Layout */}
      <div className="hidden md:flex min-h-screen p-5 gap-6">
        {/* Sidebar */}
        <aside className="w-84 md:w-95 flex-shrink-0  p-4">
          <p className="text-black text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
            Owner Profile
          </p>
          <OwnerProfileSideBar owner={owner}  formatDate={formatDate} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
            Owner  Bookings
          </h1>

          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full bg-white border rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 border">Customer</th>
                  <th className="p-3 border">Room</th>
                  <th className="p-3 border">Check-In</th>
                  <th className="p-3 border">Check-Out</th>
                  <th className="p-3 border">Guests</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Total Price</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b">
                    {editingId === booking._id ? (
                      <>
                        <td className="p-2 border">
                          <input
                            type="text"
                            value={editData.customerName}
                            onChange={(e) =>
                              setEditData({ ...editData, customerName: e.target.value })
                            }
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            type="text"
                            value={editData.roomName}
                            onChange={(e) =>
                              setEditData({ ...editData, roomName: e.target.value })
                            }
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            type="date"
                            value={editData.checkIn}
                            onChange={(e) =>
                              setEditData({ ...editData, checkIn: e.target.value })
                            }
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            type="date"
                            value={editData.checkOut}
                            onChange={(e) =>
                              setEditData({ ...editData, checkOut: e.target.value })
                            }
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            type="number"
                            value={editData.guests}
                            onChange={(e) =>
                              setEditData({ ...editData, guests: e.target.value })
                            }
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <select
                            value={editData.status}
                            onChange={(e) =>
                              setEditData({ ...editData, status: e.target.value })
                            }
                            className="border p-1 rounded w-full"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-2 border">
                          <input
                            type="number"
                            value={editData.totalPrice}
                            onChange={(e) =>
                              setEditData({ ...editData, totalPrice: e.target.value })
                            }
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="p-2 border flex gap-2">
                          <button
                            onClick={handleSave}
                            className="bg-green-600 text-white px-2 py-1 rounded flex items-center gap-1"
                          >
                            <FaSave /> Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-400 text-white px-2 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 border">{booking.customerName}</td>
                        <td className="p-2 border">{booking.roomName}</td>
                        <td className="p-2 border">{booking.checkIn}</td>
                        <td className="p-2 border">{booking.checkOut}</td>
                        <td className="p-2 border">{booking.guests}</td>
                        <td className="p-2 border">{booking.status}</td>
                        <td className="p-2 border">₹ {booking.totalPrice}</td>
                        <td className="p-2 border flex gap-2">
                          <button
                            onClick={() => handleEdit(booking)}
                            className="bg-[#5f8575] text-white px-2 py-1 rounded flex items-center gap-1"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(booking._id)}
                            className="bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1"
                          >
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden p-4">
        <aside className=" p-4 mb-4">
          <p className="text-black text-2xl font-bold mb-6 text-center">Owner Profile</p>
          <OwnerProfileSideBar user={profile} />
        </aside>

        <h1 className="text-2xl font-bold mb-4 text-center">Owner Bookings</h1>

        <div className="overflow-x-auto">
          <table className="min-w-[700px] bg-white border rounded-lg shadow-md text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Room</th>
                <th className="p-2 border">Check-In</th>
                <th className="p-2 border">Check-Out</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b">
                  <td className="p-2 border">{b.customerName}</td>
                  <td className="p-2 border">{b.roomName}</td>
                  <td className="p-2 border">{b.checkIn}</td>
                  <td className="p-2 border">{b.checkOut}</td>
                  <td className="p-2 border">{b.status}</td>
                  <td className="p-2 border flex gap-2">
                    <button
                      onClick={() => handleEdit(b)}
                      className="bg-[#5f8575] text-white px-2 py-1 rounded flex items-center"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded flex items-center"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
