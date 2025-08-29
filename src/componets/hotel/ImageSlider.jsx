"use client";
import { useState } from "react";
import Image from "next/image";

export default function ImageSlider({ hotels }) {
  const images = hotels?.roomProperty[0].image || [];
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (!images.length) return null;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openImage = (index) => {
    setCurrent(index);
    setIsOpen(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-5">
      {/* Slider */}
      <div className="relative flex items-center justify-center">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          ◀
        </button>

        {/* Sliding Wrapper */}
        <div className="flex w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500  ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, index) => (
              <div key={index} className="flex-shrink-0 w-full">
                <Image
                  src={img}
                  width={1200}
                  height={800}
                  className="w-full h-[500px] object-cover cursor-pointer"
                  alt={`Slide ${index}`}
                  onClick={() => openImage(index)}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          ▶
        </button>
      </div>

      {/* Fullscreen Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 text-white text-3xl z-50"
          >
            ✕
          </button>
          <button
            onClick={prevSlide}
            className="absolute left-5 text-white text-3xl z-50"
          >
            ◀
          </button>
          <Image
            src={images[current]}
            width={1920}
            height={1080}
            className="max-h-[90vh] object-contain"
            alt={`Full Slide ${current}`}
          />
          <button
            onClick={nextSlide}
            className="absolute right-5 text-white text-3xl z-50"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}
