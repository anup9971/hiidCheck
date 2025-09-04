"use client";

import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

export default function OwnerBookings() {
  // Dummy bookings data
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

  const [bookings, setBookings] = useState(initialBookings);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (booking) => {
    setEditingId(booking._id);
    setEditData(booking);
  };

  const handleSave = () => {
    setBookings(
      bookings.map((b) => (b._id === editingId ? editData : b))
    );
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
    <div className="max-w-7xl mx-auto p-2 md:p-6 bg-white text-black">
      <h1 className="text-3xl font-bold text-center pt-8 mb-6">Admin Bookings</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
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
                        className="bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-1"
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
    </div>
  );
}
