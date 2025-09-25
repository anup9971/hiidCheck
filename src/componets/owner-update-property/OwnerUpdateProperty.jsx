"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import OwnerProfileSideBar from "../ownerProfileDashboard/OwnerProfileSideBar";
import FormValidator from "@/componets/FormValidator";
import ownerFechData from "@/app/admin/ownerFetchData";
import { formatDate } from "@/app/untils/formatDate";

export default function OwnerUpdateHotel() {
  const { owner } = ownerFechData();
  const router = useRouter();
  const { id } = useParams();

  const [hotel, setHotel] = useState({
    hotel_name: "",
    starting_price: "",
    rating: "",
    hotel_Description: "",
    hotel_address: "",
    hotelImage: [], // New uploads
    oldImages: [],  // Existing images
  });

  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch hotel data
  useEffect(() => {
    if (!id) return;

    const fetchHotel = async () => {
      try {
        const res = await fetch(`/api/hotels/${id}`);
        const data = await res.json();

        if (data && data._id) {
          setHotel({
            hotel_name: data.hotel_name || "",
            starting_price: data.starting_price || "",
            rating: data.rating || "",
            hotel_Description: data.hotel_Description || "",
            hotel_address: data.hotel_address || "",
            hotelImage: [],
            oldImages: data.hotelImage || [],
          });
        }
      } catch (err) {
        console.error("Failed to fetch hotel:", err);
        toast.error("Failed to load hotel data");
      }
    };

    fetchHotel();
  }, [id]);

  // Handle text input change
  const handleHotelChange = (e) => {
    const { name, value } = e.target;

    // Only validate string fields to avoid .trim() error
    const stringFields = ["hotel_name", "hotel_address", "hotel_Description"];
    let error = "";
    if (stringFields.includes(name)) {
      error = FormValidator({ target: { name, value } }, hotel);
    }

    setErrorMessage((prev) => ({ ...prev, [name]: error }));
    setHotel((prev) => ({ ...prev, [name]: value }));
  };

  // Handle new image uploads
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

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate only text fields
      const textFields = ["hotel_name", "hotel_address", "hotel_Description"];
      const errors = {};
      textFields.forEach((field) => {
        if (hotel[field]) {
          errors[field] = FormValidator({ target: { name: field, value: hotel[field] } }, hotel);
        }
      });

      if (Object.values(errors).some((err) => err !== "")) {
        setErrorMessage(errors);
        setLoading(false);
        return;
      }

      // Prepare FormData
      const formData = new FormData();
      formData.append("hotel_name", hotel.hotel_name || hotel.hotel_name);
      formData.append("starting_price", hotel.starting_price || hotel.starting_price);
      formData.append("rating", hotel.rating || hotel.rating);
      formData.append("hotel_address", hotel.hotel_address || hotel.hotel_address);
      formData.append("hotel_Description", hotel.hotel_Description || hotel.hotel_Description);
      formData.append("oldImages", JSON.stringify(hotel.oldImages));

      hotel.hotelImage.forEach((file) => formData.append("hotelImage", file));

      const res = await fetch(`/api/hotels/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("Hotel updated successfully!");
      router.push("/owner-profile");
    } catch (err) {
      console.error("Error updating hotel:", err);
      toast.error("Failed to update hotel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-20">
            <h2 className="text-2xl pb-4 font-semibold">Owner Profile</h2>
            <OwnerProfileSideBar owner={owner} formatDate={formatDate} />
          </div>
        </div>

        {/* Update Form */}
        <div className="md:col-span-3">
          <div className="bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-2xl font-bold font-serif mb-6 text-center">Update Hotel</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Hotel Name */}
              <div>
                <label className="block font-medium">Hotel Name</label>
                <input
                  type="text"
                  name="hotel_name"
                  value={hotel.hotel_name}
                  onChange={handleHotelChange}
                  className="w-full p-2 border rounded-lg"
                />
                <p className="text-red-500 text-sm">{errorMessage.hotel_name}</p>
              </div>

              {/* Starting Price */}
              <div>
                <label className="block font-medium">Starting Price (₹)</label>
                <input
                  type="number"
                  name="starting_price"
                  value={hotel.starting_price}
                  onChange={handleHotelChange}
                  className="w-full p-2 border rounded-lg"
                />
                <p className="text-red-500 text-sm">{errorMessage.starting_price}</p>
              </div>

              {/* Hotel Address */}
              <div>
                <label className="block font-medium">Hotel Address</label>
                <input
                  type="text"
                  name="hotel_address"
                  value={hotel.hotel_address}
                  onChange={handleHotelChange}
                  className="w-full p-2 border rounded-lg"
                />
                <p className="text-red-500 text-sm">{errorMessage.hotel_address}</p>
              </div>

              {/* Rating */}
              <div>
                <label className="block font-medium">Rating</label>
                <select
                  name="rating"
                  value={hotel.rating}
                  onChange={handleHotelChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select rating</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <p className="text-red-500 text-sm">{errorMessage.rating}</p>
              </div>

              {/* Hotel Images */}
              <div>
                <label className="block font-medium">Hotel Images</label>
                <input
                  type="file"
                  multiple
                  name="hotelImage"
                  onChange={handleHotelImages}
                  className="w-full p-2 border rounded-lg"
                />
                <p className="text-red-500 text-sm">{errorMessage.hotelImage}</p>
                <p className="text-sm text-gray-500">
                  Upload new images to replace old ones. Old images will be preserved if not replaced.
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {hotel.oldImages.map((img, i) => (
                    <img key={i} src={img} className="w-16 h-16 object-cover rounded" />
                  ))}
                </div>
              </div>

              {/* Hotel Description */}
              <div>
                <label className="block font-medium">Hotel Description</label>
                <textarea
                  name="hotel_Description"
                  value={hotel.hotel_Description}
                  onChange={handleHotelChange}
                  className="w-full p-2 border rounded-lg"
                  rows={4}
                />
                <p className="text-red-500 text-sm">{errorMessage.hotel_Description}</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5f8575] text-white py-2 rounded-lg hover:bg-[#318d67] disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Hotel"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
