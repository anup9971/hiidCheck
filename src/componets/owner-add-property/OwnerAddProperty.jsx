"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBackward } from "react-icons/fa";
import OwnerProfileSideBar from "../ownerProfileDashboard/OwnerProfileSideBar";
import ownerFechData from "@/app/admin/ownerFetchData";
import { formatDate } from "@/app/untils/formatDate";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormValidator, { validateFormData } from "@/componets/FormValidator"

export default function OwnerAddHotel() {
  const { owner } = ownerFechData();
  const router = useRouter();

  const [hotel, setHotel] = useState({
    hotel_name: "",
    starting_price: "",
    rating: "",
    hotel_Description: "",
    hotel_address: "",
    hotelImage: [],
  });

  const [errorMessage, setErrorMessage] = useState({
    hotel_name: "",
    starting_price: "",
    rating: "",
    hotel_Description: "",
    hotel_address: "",
    hotelImage: "",
  });

  // Handle text inputs
  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    const error = FormValidator(e, hotel);

    setErrorMessage((prev) => ({ ...prev, [name]: error }));
    setHotel((prev) => ({ ...prev, [name]: value }));

    // if (error) toast.error(error);
  };

  // Handle image uploads
  const handleHotelImages = (e) => {
    const files = Array.from(e.target.files);
    const fakeEvent = { target: { name: "hotelImage", files } };
    const error = FormValidator(fakeEvent, hotel);

    setErrorMessage((prev) => ({ ...prev, hotelImage: error }));

    if (error) {
      toast.error(error);
      e.target.value = "";
      return;
    }

    setHotel((prev) => ({ ...prev, hotelImage: files }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateFormData(hotel);
    const hasError = Object.values(errors).some((err) => err !== "");

    if (hasError) {
      // Object.values(errors).forEach((err) => err && toast.error(err));
      setErrorMessage(errors);
      return;
    }

    const ownerId = localStorage.getItem("owner_id");
    if (!ownerId) return toast.error("Owner not logged in");

    const formData = new FormData();
    formData.append("ownerId", ownerId);
    formData.append("hotel_name", hotel.hotel_name);
    formData.append("starting_price", hotel.starting_price);
    formData.append("rating", hotel.rating);
    formData.append("hotel_address", hotel.hotel_address);
    formData.append("hotel_Description", hotel.hotel_Description);

    hotel.hotelImage.forEach((file) => formData.append("hotelImage", file));

    try {
      const res = await fetch("/api/hotels", { method: "POST", body: formData });
      const data = await res.json();

      if (data._id) {
        toast.success("Hotel saved successfully!");
        router.push("/owner-profile");
      } else {
        toast.error("Failed to save hotel.");
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    }
  };

  return (
    <div className="mt-[-4px]">
      <div className="grid grid-cols-1 text-black pt-10 md:grid-cols-4 gap-6 md:gap-50 p-4">
        {/* Sidebar */}
        <div className="p-4 md:col-span-1 md:w-95">
          <h2 className="text-2xl pb-4 font-semibold">Owner Profile</h2>
          <OwnerProfileSideBar owner={owner} formatDate={formatDate} />
        </div>

        {/* Form */}
        <div className="bg-white shadow-xl rounded-2xl p-6 md:col-span-3">
          <h2 className="text-2xl font-bold font-serif mb-6 text-center">
            Add Hotel{" "}
            <span className="float-end">
              <Link href="owner-profile">
                <FaBackward />
              </Link>
            </span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Hotel Name */}
            <div>
              <label className="block font-medium">Hotel Name *</label>
              <input
                type="text"
                name="hotel_name"
                onChange={handleHotelChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter Hotel Name"
              />
              <p className="text-red-500 text-sm uppercase">{errorMessage.hotel_name}</p>
            </div>

            {/* Starting Price */}
            <div>
              <label className="block font-medium">Starting Price (₹) *</label>
              <input
                type="number"
                name="starting_price"
                onChange={handleHotelChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Room Starting Price"
              />
              <p className="text-red-500 text-sm uppercase">{errorMessage.starting_price}</p>
            </div>

            {/* Hotel Address */}
            <div>
              <label className="block font-medium">Hotel Address *</label>
              <input
                type="text"
                name="hotel_address"
                onChange={handleHotelChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Hotel Address"
              />
              <p className="text-red-500 text-sm uppercase">{errorMessage.hotel_address}</p>
            </div>

            {/* Rating */}
            <div>
              <label className="block font-medium">Hotel Rating (1-5) *</label>
              <select
                name="rating"
                onChange={handleHotelChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-sm uppercase">{errorMessage.rating}</p>
            </div>

            {/* Hotel Images */}
            <div>
              <label className="block font-medium">Hotel Images *</label>
              <input
                type="file"
                multiple
                name="hotelImage"
                onChange={handleHotelImages}
                className="w-full p-2 border rounded-lg"
              />
              <p className="text-red-500 text-sm uppercase">{errorMessage.hotelImage}</p>
              <p className="text-sm text-gray-500">
                Only WEBP format allowed. Max size: 200KB
              </p>
            </div>

            {/* Hotel Description */}
            <div>
              <label className="block font-medium">Hotel Description *</label>
              <textarea
                name="hotel_Description"
                onChange={handleHotelChange}
                className="w-full p-2 border rounded-lg"
                rows={4}
                placeholder="Describe your hotel here..."
              />
              <p className="text-red-500 text-sm uppercase">{errorMessage.hotel_Description}</p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5f8575] text-white py-2 rounded-lg hover:bg-[#318d67]"
            >
              Save Hotel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
