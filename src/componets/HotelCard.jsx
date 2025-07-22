'use client';
import Image from 'next/image';

const hotels = [
  {
    image: '/images/mumbai.jpg',
    city: 'Mumbai',
    region: 'Maharashtra, India',
    price: '₹8,653',
  },
  {
    image: '/images/patong.jpg',
    city: 'Patong',
    region: 'Phuket Province, Thailand',
    price: '₹6,362',
  },
  {
    image: '/images/phuket.jpg',
    city: 'Phuket',
    region: 'Phuket Province, Thailand',
    price: '₹3,653',
  },
];

export default function HotelCards() {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotels.map((hotel, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden border border-gray-200 shadow hover:shadow-lg transition bg-white"
          >
            <Image
              src={hotel.image}
              alt={hotel.city}
              width={400}
              height={260}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{hotel.city}</h3>
              <p className="text-blue-700 text-sm mb-2">{hotel.region}</p>
              <p className="text-lg font-bold">{hotel.price}</p>
              <p className="text-sm text-gray-500">avg. nightly price</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
