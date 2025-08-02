"use client";
import { useState } from "react";

import HotelCard from "@/componets/search/HotelCard";
import FilterSidebar from "@/componets/search/FilterSidebar";
import data from "@/data";
import { useParams } from "next/navigation";

export default function HotelPage() {
   let param = useParams()
   let hotels = data?.find((x)=>x?.id ==param?.id)
   console.log(hotels?.roomProperty);
   
  const [filters, setFilters] = useState({
    type: "",
    maxPrice: 6000,
    minRating: 0,
    parking: false,
    restaurant: false,
  });

  // const filtered =  hotels?.roomProperty?.filter((hotel) => {
  //   return (
  //     (!filters.type || hotel.propertyType === filters.type) &&
  //     hotel.price <= filters.maxPrice &&
  //     hotel.rating >= filters.minRating &&
  //     (!filters.parking || hotel.features.parking) &&
  //     (!filters.restaurant || hotel.features.restaurant)
  //   );
  // });
//   const filtered = hotels?.roomProperty?.filter((hotel) => {
//   return true;
// });


const filtered = hotels?.roomProperty?.filter((hotel) => {
  const typeMatch = !filters.type || hotel.propertyType?.toLowerCase() === filters.type.toLowerCase();
  const priceMatch = !filters.maxPrice || hotel.price <= filters.maxPrice;
  const ratingMatch = !filters.minRating || hotel.rating >= filters.minRating;
  const parkingMatch = !filters.parking || hotel.features?.parking === true;
  const restaurantMatch = !filters.restaurant || hotel.features?.restaurant === true;

  return typeMatch && priceMatch && ratingMatch && parkingMatch && restaurantMatch;
});

  console.log(filtered);
  

  return (
    <div className="flex flex-col bg-gray-100 md:flex-row gap-6 px-4 py-6">
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <div className="flex-1 space-y-4">
        {filtered.map((hotel) => (
          <HotelCard hotel={hotel} key={hotel.id} />
        ))}
       
        
        {filtered.length === 0 && <p>No hotels match your filters.</p>}
      </div>
    </div>
  );
}
