"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const cards = [
  {
    id: 1,
    title: "Corporate Excellence",
    subtitle: "Driving Growth & Innovation",
    description:
      "We provide end-to-end corporate solutions tailored to enhance productivity and growth.",
    img: "/hotel/conference.jpg",
  },
  {
    id: 2,
    title: "Innovative Strategies",
    subtitle: "Future-Ready Solutions",
    description:
      "Our innovative strategies help organizations achieve sustainable success.",
    img: "/hotel/corporate.jpg",
  },
  {
    id: 3,
    title: "Trusted Partnerships",
    subtitle: "Collaboration That Lasts",
    description:
      "Building long-term partnerships with integrity, trust, and excellence.",
    img: "/hotel/hotel1.jpg",
  },
  {
    id: 4,
    title: "Global Network",
    subtitle: "Connecting Opportunities Worldwide",
    description:
      "Our corporate network spans across industries and geographies worldwide.",
    img: "/hotel/hotel2.jpg",
  },
];

export default function CorporateSwiper() {
  return (
    <section className="bg-gray-50 text-black py-16 mt-[-4px]">
      <div className="container mx-auto text-center mb-10 px-6">
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#5f8575]">
          Our Corporate Values
        </h3>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover how we create value for our partners worldwide.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1 }, // Mobile
            768: { slidesPerView: 2 }, // Tablet
            1024: { slidesPerView: 3 }, // Desktop
          }}
        >
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-semibold mb-1">{card.title}</h4>
                  <span className="text-[#5f8575] font-medium mb-3">
                    {card.subtitle}
                  </span>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {card.description}
                  </p>
                  <button className="mt-auto bg-[#5f8575] text-white px-4 py-2 rounded-lg hover:bg-[#4e6b60] transition">
                      <Link href={`/corporate/${card?.id}`} >
                            Reserve 
                      </Link>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
