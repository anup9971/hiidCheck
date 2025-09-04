"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AdminRoomsPage() {
  const initialRooms = [
    {
      _id: "1",
      roomName: "Classic Room",
      roomPrice: 1500,
      roomRating: 4,
      roomQuantity: 5,
      roomImage: ["/room1.jpg"],
      propertyType: "Hotel",
      roomAmenities: ["AC", "WiFi", "TV"],
      roomMap: "https://maps.google.com?q=karol bagh",
      roomLocation: "Karol Bagh, New Delhi",
      breakFast: "₹200",
      dinner: "₹400",
      facilities: "AC, TV, WiFi, Room Service",
      description: "Cozy room with all basic amenities",
    },
    {
      _id: "2",
      roomName: "Deluxe Room",
      roomPrice: 2500,
      roomRating: 5,
      roomQuantity: 3,
      roomImage: ["/room2.jpg"],
      propertyType: "Hotel",
      roomAmenities: ["AC", "WiFi", "TV", "Mini Bar"],
      roomMap: "https://maps.google.com?q=connaught place",
      roomLocation: "Connaught Place, New Delhi",
      breakFast: "₹250",
      dinner: "₹500",
      facilities: "AC, TV, WiFi, Room Service, Mini Bar",
      description: "Spacious deluxe room with luxurious facilities",
    },
  ];
  const router = useRouter()
  const [rooms, setRooms] = useState(initialRooms);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (room) => {
    setEditingRoomId(room._id);
    // router.push("/owner-update-property")
    setEditData(room);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter((room) => room._id !== id));
      alert("Room deleted!");
    }
  };

  const handleSave = () => {
    setRooms(
      rooms.map((room) => (room._id === editingRoomId ? editData : room))
    );
    setEditingRoomId(null);
    alert("Room updated!");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 text-black bg-white ">
      <h1 className="text-3xl font-bold mb-6 font-serif   pt-8  pb-6 text-center text-gray-800">
        Admin Room Management
      </h1>

      <div className="grid grid-cols-1 pb-40 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-2xl transition duration-300"
          >
            {/* Room Image */}
            <div className="relative w-full h-48 sm:h-56">
              {room.roomImage && room.roomImage.length > 0 ? (
                <Image
                  src={room.roomImage[0]}
                  alt={room.roomName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>

            <div className="p-4">
              {editingRoomId === room._id ? (
                <>
                  <input
                    type="text"
                    className="w-full border p-2 mb-2 rounded"
                    value={editData.roomName}
                    onChange={(e) =>
                      setEditData({ ...editData, roomName: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="w-full border p-2 mb-2 rounded"
                    value={editData.roomPrice}
                    onChange={(e) =>
                      setEditData({ ...editData, roomPrice: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="w-full border p-2 mb-2 rounded"
                    value={editData.roomQuantity}
                    onChange={(e) =>
                      setEditData({ ...editData, roomQuantity: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="w-full border p-2 mb-2 rounded"
                    value={editData.roomLocation}
                    onChange={(e) =>
                      setEditData({ ...editData, roomLocation: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="w-full border p-2 mb-2 rounded"
                    value={editData.roomMap}
                    onChange={(e) =>
                      setEditData({ ...editData, roomMap: e.target.value })
                    }
                  />
                  <textarea
                    className="w-full border p-2 mb-2 rounded"
                    rows={2}
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="w-full border p-2 mb-2 rounded"
                    value={editData.breakFast}
                    onChange={(e) =>
                      setEditData({ ...editData, breakFast: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="w-full border p-2 mb-2 rounded"
                    value={editData.dinner}
                    onChange={(e) =>
                      setEditData({ ...editData, dinner: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="w-full border p-2 mb-2 rounded"
                    value={editData.propertyType}
                    onChange={(e) =>
                      setEditData({ ...editData, propertyType: e.target.value })
                    }
                  />
                  <textarea
                    className="w-full border p-2 mb-2 rounded"
                    rows={2}
                    value={editData.facilities}
                    onChange={(e) =>
                      setEditData({ ...editData, facilities: e.target.value })
                    }
                  />
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editData.roomAmenities.map((amenity, idx) => (
                      <input
                        key={idx}
                        type="text"
                        className="border p-1 rounded"
                        value={amenity}
                        onChange={(e) => {
                          const newAmenities = [...editData.roomAmenities];
                          newAmenities[idx] = e.target.value;
                          setEditData({ ...editData, roomAmenities: newAmenities });
                        }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleSave}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <FaSave /> Save
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{room.roomName}</h2>
                  <p className="text-gray-600">{room.roomLocation}</p>
                  <p className="font-bold mt-1">₹ {room.roomPrice} / night</p>
                  <p className="mt-1">Rating: {room.roomRating}</p>
                  <p className="mt-1">Quantity: {room.roomQuantity}</p>
                  <p className="mt-1">Breakfast: {room.breakFast}</p>
                  <p className="mt-1">Dinner: {room.dinner}</p>
                  <p className="mt-1">Property Type: {room.propertyType}</p>
                  <p className="mt-1 text-sm">{room.description}</p>
                  <p className="mt-1 text-sm">Facilities: {room.facilities}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {room.roomAmenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={() => handleEdit(room)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
