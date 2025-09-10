"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBackward } from "react-icons/fa";
import OwnerProfileSideBar from "../ownerProfileDashboard/OwnerProfileSideBar";

export default function OwnerUpdateProperty() {
  let [user, setUser] = useState([]);

  // ✅ Static Dummy Data (Update Mode)
  const dummyHotel = {
    name: "Hotel Siam International",
    price: "2500",
    rating: "4",
    location: "Karol Bagh, New Delhi",
    hotelImage: ["hotel1.jpg", "hotel2.jpg"],
    roomProperty: [
      {
        roomName: "Deluxe Room",
        roomPrice: "1800",
        roomRating: "4",
        roomQuantity: "10",
        roomImage: ["room1.jpg"],
        propertyType: "Hotel",
        roomAmenities: ["Wi-fi", "AC"],
        roomMap: "https://maps.google.com/xyz",
        roomLocation: "1st Floor",
        breakFast: "200",
        dinner: "400",
        facilities: "AC, TV, Free WiFi, Attached Bathroom",
        description: "Spacious deluxe room with all modern facilities.",
        features: {
          parking: true,
          restaurant: false,
        },
      },
    ],
  };

  const [hotel, setHotel] = useState(null);

  // Load dummy data
  useEffect(() => {
    setHotel(dummyHotel);
  }, []);

  if (!hotel) return <p className="text-center">Loading...</p>;

  // Hotel field change
  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  // Hotel images
  const handleHotelImages = (e) => {
    const files = Array.from(e.target.files).map((file) => file.name);
    setHotel({ ...hotel, hotelImage: files });
  };

  // Room field change
  const handleRoomChange = (index, e) => {
    const { name, value, type, checked, files } = e.target;
    const rooms = [...hotel.roomProperty];

    if (type === "checkbox") {
      let amenities = [...rooms[index].roomAmenities];
      if (checked) amenities.push(value);
      else amenities = amenities.filter((a) => a !== value);
      rooms[index].roomAmenities = amenities;
    } else if (type === "file") {
      const fileArray = Array.from(files).map((file) => file.name);
      rooms[index][name] = fileArray;
    } else {
      rooms[index][name] = value;
    }

    setHotel({ ...hotel, roomProperty: rooms });
  };

  // Submit handler (only update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating Hotel Data:", hotel);
    alert("Hotel Updated Successfully (dummy)");
  };

  return (
    <div className="mt-[-4px]">
      <div className="grid grid-cols-1 text-black pt-10 md:grid-cols-4 gap-6 p-4">
        {/* Sidebar Section */}
        <div className="p-4 md:col-span-1">
          <h2 className="text-2xl pb-4 font-semibold">Owner Profile</h2>
          <OwnerProfileSideBar user={user} />
        </div>

        {/* Form Section */}
        <div className="bg-white shadow-xl rounded-2xl p-6 md:col-span-3">
          <h2 className="text-2xl font-bold font-serif mb-6 text-center">
            Update Hotel{" "}
            <span className="float-end">
              <Link href="/owner-profile">
                <FaBackward />
              </Link>
            </span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Hotel Fields */}
            <div>
              <label className="block font-medium">Hotel Name</label>
              <input
                type="text"
                name="name"
                value={hotel.name}
                onChange={handleHotelChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Room Starting Price (₹)</label>
              <input
                type="number"
                name="price"
                value={hotel.price}
                onChange={handleHotelChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={hotel.location}
                onChange={handleHotelChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Hotel Rating (1-5)</label>
              <select
                name="rating"
                value={hotel.rating}
                onChange={handleHotelChange}
                className="w-full p-2 border rounded-lg"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Hotel Images</label>
              <input
                type="file"
                multiple
                onChange={handleHotelImages}
                className="w-full p-2 border rounded-lg"
              />
              <p className="text-sm text-gray-500">
                Current: {hotel.hotelImage.join(", ")}
              </p>
            </div>

            <hr className="my-6" />

            {/* Room Section */}
            {hotel.roomProperty.map((room, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block font-medium">Room Name*</label>
                  <input
                    type="text"
                    name="roomName"
                    value={room.roomName}
                    onChange={(e) => handleRoomChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium">Room Price (₹)*</label>
                  <input
                    type="number"
                    name="roomPrice"
                    value={room.roomPrice}
                    onChange={(e) => handleRoomChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium">Room Location*</label>
                  <input
                    type="text"
                    name="roomLocation"
                    value={room.roomLocation}
                    onChange={(e) => handleRoomChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium">Room Quantity*</label>
                  <input
                    type="number"
                    name="roomQuantity"
                    value={room.roomQuantity}
                    onChange={(e) => handleRoomChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium">Room Map URL*</label>
                  <input
                    type="text"
                    name="roomMap"
                    value={room.roomMap}
                    onChange={(e) => handleRoomChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium">Room Images*</label>
                  <input
                    type="file"
                    multiple
                    name="roomImage"
                    onChange={(e) => handleRoomChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                  />
                  <p className="text-sm text-gray-500">
                    Current: {room.roomImage.join(", ")}
                  </p>
                </div>

                <div>
                  <label className="block font-medium">Room Property Type*</label>
                  <select
                    name="propertyType"
                    value={room.propertyType}
                    onChange={(e) => handleRoomChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">select property type</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Conference Hall">Conference Hall</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium">Room Rating*</label>
                  <select
                    name="roomRating"
                    value={room.roomRating}
                    onChange={(e) => handleRoomChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                  >
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium">BreakFast Price</label>
                  <input
                    type="text"
                    name="breakFast"
                    value={room.breakFast}
                    onChange={(e) => handleRoomChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium">Dinner Price</label>
                  <input
                    type="text"
                    name="dinner"
                    value={room.dinner}
                    onChange={(e) => handleRoomChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-medium mb-2">Room Amenities*</label>
                  <div className="flex flex-wrap gap-4">
                    {["Wi-fi", "AC", "Parking", "Breakfast"].map((a) => (
                      <label key={a} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={a}
                          checked={room.roomAmenities.includes(a)}
                          onChange={(e) => handleRoomChange(index, e)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <span>{a}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block font-medium">Facilities*</label>
                  <textarea
                    name="facilities"
                    value={room.facilities}
                    onChange={(e) => handleRoomChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-medium">Description*</label>
                  <textarea
                    name="description"
                    value={room.description}
                    onChange={(e) => handleRoomChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-[#5f8575] text-white py-2 rounded-lg hover:bg-[#318d67]"
            >
              Update Hotel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
