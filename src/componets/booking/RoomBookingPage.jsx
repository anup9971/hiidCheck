"use client";
import { useEffect, useState } from "react";
import FormData from "@/componets/booking/FromData";

export default function BookingPage() {
  const [bookingData, setBookingData] = useState(null);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data) setBookingData(JSON.parse(data));

    // Load Razorpay SDK
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setSdkReady(true);
    document.body.appendChild(script);
  }, []);

  if (!bookingData) return <p>Loading...</p>;

  const { checkIn, checkOut, nights, rooms, adults, totalPrice, child, gst, subTotal } = bookingData;

  const handlePayment = async () => {
  try {
    // 1. Call backend API for order
    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPrice }),
    });

    const order = await res.json();

    if (!order.id) {
      alert("Order creation failed!");
      return;
    }

    // 2. Open Razorpay
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // frontend public key
      amount: order.amount,
      currency: order.currency,
      name: "Hotel Booking",
      description: "Room booking payment",
      order_id: order.id, // 👈 yaha backend se aya order_id
      handler: function (response) {
        alert("✅ Payment Success! \nPayment ID: " + response.razorpay_payment_id);
        console.log("Payment Success Response:", response);
      },
      prefill: {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        contact: "9999999999",
      },
      theme: { color: "#5f8575" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (err) {
    console.error("Payment error:", err);
    alert("Something went wrong, please try again!");
  }
};


  return (
    <div className="max-w-7xl pt-15 pb-20 mx-auto bg-white text-black px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Guest Form */}
        <FormData />

        {/* Right: Booking Summary */}
        <div className="bg-gray-50 p-6 rounded-lg shadow space-y-4">
          <h3 className="font-semibold text-lg mb-2">Your Booking Details</h3>
          <hr className="text-gray-200" />

          <div className="grid grid-cols-2 gap-2 text-sm">
            <span>Check-In</span>
            <span className="font-semibold">{new Date(checkIn).toDateString()} (1 PM)</span>
            <span>Check-Out</span>
            <span className="font-semibold">{new Date(checkOut).toDateString()} (11 AM)</span>
            <span>Total nights</span>
            <span className="font-semibold">{nights} Night</span>

            <span>{`Base Price (${rooms} Room x ${nights} night)`}</span>
            <span className="font-semibold">₹ {subTotal}/-</span>

            <span>Hotel GST 12%</span>
            <span className="font-semibold">₹ {gst}/-</span>
          </div>

          <p className="text-md">
            You selected: <span className="font-semibold">{rooms} Rooms</span> for{" "}
            <span className="font-semibold">{adults} Adults</span> &{" "}
            <span className="font-semibold">{child} Child</span>
          </p>

          <div className="bg-white p-4 rounded border">
            <h4 className="font-semibold">Total Amount to be paid</h4>
            <p className="text-2xl font-bold">₹ {totalPrice}</p>
            <p className="text-xs text-gray-500">Includes taxes and charges</p>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={!sdkReady}
            className="w-full bg-[#5f8575] text-white py-3 rounded-lg hover:bg-[#4e6b60] transition disabled:opacity-50"
          >
            {sdkReady ? "Book & Pay Now" : "Loading Payment..."}
          </button>
        </div>
      </div>
    </div>
  );
}
