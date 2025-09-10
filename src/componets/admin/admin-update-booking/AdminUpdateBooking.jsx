"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminProfileSideBar from "../admin-dasboard/AdminProfileSideBar";

export default function AdminUpdateBooking() {
  const router = useRouter();
  const { id } = useParams(); // URL se booking id pick karega
  const [formData, setFormData] = useState({
    client: "",
    hotel: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    status: "pending",
    amount: "",
    paymentStatus: "unpaid",
  });

  // Dummy fetch - baad me API call se booking details laa lena
  useEffect(() => {
    // Example: fetch(`/api/bookings/${id}`).then(...)
    if (id) {
      // For demo, fake data
      setFormData({
        client: "Rahul Sharma",
        hotel: "The Grand Plaza",
        checkIn: "2025-09-12",
        checkOut: "2025-09-15",
        guests: 2,
        status: "confirmed",
        amount: 22500,
        paymentStatus: "paid",
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Booking Data:", formData);

    // API call example:
    // fetch(`/api/bookings/${id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });

    alert("Booking updated successfully!");
    router.push("/admin/bookings"); // wapas bookings list page
  };

  return (
    <div className="min-h-screen pt-10 pb-15 mt-[-4px] md:pt-20 md:pb-20 text-black bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-2">
          <p className="text-black font-bold text-3xl mt-2 pb-2">Admin Profile</p>
          <AdminProfileSideBar user={{ name: "Admin" }} />
        </aside>

        {/* Form Content */}
        <main className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6">Update Booking</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client & Hotel */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1">Client Name</label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Hotel</label>
                  <input
                    type="text"
                    name="hotel"
                    value={formData.hotel}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1">Check-In</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Check-Out</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Guests & Amount */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1">Guests</label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Status */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1">Booking Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg bg-white"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Payment Status</label>
                  <select
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg bg-white"
                  >
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#5f8575] text-white py-3 rounded-lg hover:bg-[#4e6b60] transition"
              >
                Update Booking
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
