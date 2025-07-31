"use client";

import { useRef } from "react";

const hotels = [
  {
    id: 1,
    name: "Classic Room - V Hotel The Grand Shoba",
    price: "₹6,499/night",
    rating: 4.5,
    location: "Mahipalpur, Near IGI New Delhi",
    image: "/hotel/vhotel.jpg",
  
  },
  {
    id: 2,
    name: "Deluxe Room -Hotel Delhi Airport ",
    price: "₹5,200/night",
    rating: 4.8,
    location: "Mahipalpur, Near IGI New Delhi",
    image: "/hotel/hotel1.jpg",
  },
  {
    id: 3,
    name: "Hotel TSSG ",
    price: "₹2,100/night",
    rating: 4.2,
    location: "Mahipalpur, Near IGI New Delhi",
    image: "/hotel/hotel2.jpg",
  },
  {
    id: 4,
    name: "Hotel PortView",
    price: "₹6,000/night",
    rating: 4.9,
    location: "Kerala",
    image: "/hotel/hotel3.jpg",
  },
  {
    id: 5,
    name: "Hotel YashoBhoomi ",
    price: "₹4,300/night",
    rating: 4.7,
    location: "Mahipalpur, Near IGI New Delhi",
    image:"/hotel/hotel4.jpg",
  },
    {
    id: 6,
    name: "Hotel Tomar Hospitality",
    price: "₹3,499/night",
    rating: 4.5,
    location: "Karol bagh, New Delhi",
    image: "/hotel/hotel5.jpg",
  },
  {
    id: 7,
    name: "Luxury Stay In Karol Bagh",
    price: "₹5,200/night",
    rating: 4.8,
    location: "Karol Bagh, New Delhi",
    image: "/hotel/hotel6.jpg",
  },
  {
    id: 8,
    name: "Stay Budget Inn",
    price: "₹1,999/night",
    rating: 4.2,
    location: "Karol Bagh , New Delhi",
    image: "/hotel/hotel7.jpg",
  },
  {
    id: 9,
    name: "Hotel O Delhi",
    price: "₹6,000/night",
    rating: 4.9,
    location: "Karol Bagh, New Delhi",
    image: "/hotel/hotel8.jpg",
  },
 
];

export default function RoomSection() {
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
    <section className="px-4 py-10  bg-white">
      <div className="flex justify-between  items-center mb-6">
        <h2 className="text-2xl font-bold text-black"> Browse by property type</h2>
        <div className="space-x-2 gap-5  hidden md:flex">
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
        {hotels.map((hotel,index) => (
       <div
            key={index}
            className="min-w-[280px] w-[180px] sm:min-w-[300px] md:min-w-[320px]  border rounded-xl shadow-md overflow-hidden snap-start shrink-0"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-78 object-cover"
            />
            {/* <div className="p-4"> */}
              <h3 className="text-lg block text-gray-800 font-semibold">{hotel.name}</h3>
              {/* <p className="text-gray-500 text-sm">{hotel.location}</p> */}
              {/* <div className="flex justify-between items-center mt-2">
                <span className="text-green-700 text-sm">⭐ {hotel.rating}</span>
                <span className="text-sm font-semibold text-gray-800">
                {hotel.price}
                </span>
                </div> */}
            {/* </div> */}

        
          </div>
        ))}
      </div>
    </section>
  );
}
