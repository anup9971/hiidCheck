"use client";

import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function CorparateDetailsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    details: "",
    checkin: "",
    checkout: "",
    room: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your inquiry has been submitted ✅");
  };

  return (
    <div className="min-h-screen mt-[-4px] bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh]">
        <img
          src="/hotel/hotel1.jpg"
          alt="Hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Luxury Conference & Stay
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Premium venue with modern facilities for your corporate and leisure
            needs.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="/hotel/conference.jpg"
          alt="Conference"
          className="rounded-2xl shadow-lg object-cover h-[350px] w-full"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4 text-[#5f8575]">About Us</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            With elegant interiors and state-of-the-art amenities, our hotel is
            the perfect choice for conferences, events, and luxury stays. We
            ensure a seamless experience with unmatched hospitality.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>✔ Conference Hall: 300 Guests</li>
            <li>✔ Banquet Hall: 200 Guests</li>
            <li>✔ 120 Luxury Rooms</li>
          </ul>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-[#5f8575]">
            Amenities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "High-speed Wi-Fi",
              "Swimming Pool & Spa",
              "Multi-cuisine Restaurant",
              "24/7 Room Service",
              "Free Parking",
              "Business Center",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <p className="text-lg font-medium text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#5f8575]">
            Contact Us
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-4">
              <p className="text-gray-700">
                We’d love to hear from you! Reach out for bookings, conferences,
                or collaborations.
              </p>
              <p className="flex items-center text-gray-700">
                <MapPin className="mr-2 text-[#5f8575]" /> New Delhi, India
              </p>
              <p className="flex items-center text-gray-700">
                <Phone className="mr-2 text-[#5f8575]" /> +91 9876543210
              </p>
              <p className="flex items-center text-gray-700">
                <Mail className="mr-2 text-[#5f8575]" /> info@luxuryhotel.com
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 text-black rounded-2xl shadow-lg space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="border p-3 rounded-lg w-full"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="border p-3 rounded-lg w-full"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone"
                  className="border p-3 rounded-lg w-full"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="organization"
                  placeholder="Organization"
                  className="border p-3 rounded-lg w-full"
                  value={formData.organization}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="checkin"
                  className="border p-3 rounded-lg w-full"
                  value={formData.checkin}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="checkout"
                  className="border p-3 rounded-lg w-full"
                  value={formData.checkout}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="text"
                name="room"
                placeholder="Room Type (Optional)"
                className="border p-3 rounded-lg w-full"
                value={formData.room}
                onChange={handleChange}
              />
              <textarea
                name="details"
                placeholder="Details / Message"
                rows="4"
                className="border p-3 rounded-lg w-full"
                value={formData.details}
                onChange={handleChange}
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#5f8575] text-white px-6 py-3 rounded-lg hover:bg-[#4e6b60] transition"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
