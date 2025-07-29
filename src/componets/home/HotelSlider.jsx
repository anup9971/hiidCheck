"use client";

import { useRef } from "react";

const hotels = [
  {
    id: 1,
    name: "Hotel Paradise",
    price: "₹3,499/night",
    rating: 4.5,
    location: "New Delhi",
    image: "https://picsum.photos/id/1018/600/400",
  },
  {
    id: 2,
    name: "Luxury Stay",
    price: "₹5,200/night",
    rating: 4.8,
    location: "Mumbai",
    image: "https://picsum.photos/id/1015/600/400",
  },
  {
    id: 3,
    name: "Budget Inn",
    price: "₹2,100/night",
    rating: 4.2,
    location: "Goa",
    image: "https://picsum.photos/id/1025/600/400",
  },
  {
    id: 4,
    name: "Seaside Resort",
    price: "₹6,000/night",
    rating: 4.9,
    location: "Kerala",
    image: "https://picsum.photos/id/1020/600/400",
  },
  {
    id: 5,
    name: "Himalaya View",
    price: "₹4,300/night",
    rating: 4.7,
    location: "Shimla",
    image: "https://picsum.photos/id/1024/600/400",
  },
    {
    id: 1,
    name: "Hotel Paradise",
    price: "₹3,499/night",
    rating: 4.5,
    location: "New Delhi",
    image: "https://picsum.photos/id/1018/600/400",
  },
  {
    id: 2,
    name: "Luxury Stay",
    price: "₹5,200/night",
    rating: 4.8,
    location: "Mumbai",
    image: "https://picsum.photos/id/1015/600/400",
  },
  {
    id: 3,
    name: "Budget Inn",
    price: "₹2,100/night",
    rating: 4.2,
    location: "Goa",
    image: "https://picsum.photos/id/1025/600/400",
  },
  {
    id: 4,
    name: "Seaside Resort",
    price: "₹6,000/night",
    rating: 4.9,
    location: "Kerala",
    image: "https://picsum.photos/id/1020/600/400",
  },
  {
    id: 5,
    name: "Himalaya View",
    price: "₹4,300/night",
    rating: 4.7,
    location: "Shimla",
    image: "https://picsum.photos/id/1024/600/400",
  },
];

export default function HotelSlider() {
  const scrollRef = useRef();

  const slide = (direction) => {
    const scrollAmount = 320;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="px-4 py-10 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🏨 Recommended Hotels</h2>
        <div className="space-x-2 hidden md:flex">
          <button
            onClick={() => slide("left")}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full"
          >
            ◀
          </button>
          <button
            onClick={() => slide("right")}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full"
          >
            ▶
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
      >
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] bg-white border rounded-xl shadow-md overflow-hidden snap-start shrink-0"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{hotel.name}</h3>
              <p className="text-gray-500 text-sm">{hotel.location}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-yellow-500 text-sm">⭐ {hotel.rating}</span>
                <span className="text-sm font-semibold text-gray-800">
                  {hotel.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
