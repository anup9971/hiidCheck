"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBackward } from "react-icons/fa";
import OwnerProfileSideBar from "../ownerProfileDashboard/OwnerProfileSideBar";
// import Sidebar from "../admin-dasboard/AdminProfileSideBar"; // 👈 apna sidebar component import yaha lagana

export default function OwnerAddProperty() {
  let [user, setUser]=useState([])
  const [hotel, setHotel] = useState({
    name: "",
    price: "",
    rating: "",
    location: "",
    hotelImage: [],
    roomProperty: [
      {
        roomName: "",
        roomPrice: "",
        roomRating: "",
        roomQuantity: "",
        roomImage: [],
        propertyType: "",
        roomAmenities: [],
        roomMap: "",
        roomLocation: "",
        breakFast: "",
        dinner: "",
        facilities: "",
        description: "",
        features: {
          parking: false,
          restaurant: false,
        },
      },
    ],
  });

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

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending Hotel Data:", hotel);

    try {
      return alert("Data successFully");
      const res = await fetch("http://localhost:5000/api/hotels/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotel),
      });
      const data = await res.json();
      if (data.success) alert("Hotel saved successfully!");
      else alert("Failed to save hotel.");
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
<>
<div className="mt-[-4px]">
      <div className="grid grid-cols-1 text-black pt-10 md:grid-cols-4 gap-6 p-4">
      {/* Sidebar Section */}
      <div className="   p-4 md:col-span-1">
        <h2 className="text-2xl pb-4 font-semibold">Owner Profile</h2>
        {/* <Sidebar />  👈 yaha apna sidebar component lagao */}
       <OwnerProfileSideBar user={user}/>
      </div>

      {/* Form Section */}
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
          {/* Hotel Fields */}
          <div>
            <label className="block font-medium">Hotel Name</label>
            <input
              type="text"
              name="name"
              onChange={handleHotelChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Hotel Siam International"
            />
          </div>

          <div>
            <label className="block font-medium">Room Starting Price (₹)</label>
            <input
              type="number"
              name="price"
              onChange={handleHotelChange}
              className="w-full p-2 border rounded-lg"
              placeholder="1800"
            />
          </div>

          <div>
            <label className="block font-medium">Location</label>
            <input
              type="text"
              name="location"
              onChange={handleHotelChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Karol Bagh, New Delhi"
            />
          </div>

          <div>
            <label className="block font-medium">Hotel Rating (1-5)</label>
            <select
              name="rating"
              onChange={handleHotelChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">select rating</option>
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
                  <option value="">select room rating</option>
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
                  placeholder="Rooms feature AC, TV, WiFi..."
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
                  placeholder="Our Classic Room offers a cozy stay..."
                />
              </div>
            </div>
          ))}

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
</>
  );
}
