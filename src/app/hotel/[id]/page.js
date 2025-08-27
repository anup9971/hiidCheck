"use client";
import { useState } from "react";

import HotelCard from "@/componets/search/HotelCard";
import FilterSidebar from "@/componets/search/FilterSidebar";
import data from "@/data";
import { useParams } from "next/navigation";

export default function HotelPage() {
   let param = useParams()

  //   Related Hotel
  let hotels = data?.find((x)=>x?.id ==param?.id)
  //  console.log(hotels?.roomProperty);
  let OtherHotels = data.flat().filter((item)=> String(item.id) !== String(param.id))

   let otherRelatedHotels = OtherHotels.flatMap((hotel)=>hotel.roomProperty)
   
  const [filters, setFilters] = useState({
    type: "",
    maxPrice: 10000,
    minRating: 0,
    parking: false,
    restaurant: false,
  });





// const filtered = hotels?.roomProperty?.filter((hotel) => {
//   const typeMatch = !filters.type || hotel.propertyType?.toLowerCase() === filters.type.toLowerCase();
//   const priceMatch = !filters.maxPrice || hotel.price <= filters.maxPrice;
//   const ratingMatch = !filters.minRating || hotel.rating >= filters.minRating;
//   const parkingMatch = !filters.parking || hotel.features?.parking === true;
//   const restaurantMatch = !filters.restaurant || hotel.features?.restaurant === true;

//   return typeMatch && priceMatch && ratingMatch && parkingMatch && restaurantMatch;
// });

  // Reusable filter function
const filterHotels = (hotelsArray, filters) => {
  return hotelsArray?.filter((hotel) => {
    const typeMatch = !filters.type || hotel.propertyType?.toLowerCase() === filters.type.toLowerCase();
    const priceMatch = !filters.maxPrice || hotel.price <= filters.maxPrice;
    const ratingMatch = !filters.minRating || hotel.rating >= filters.minRating;
    const parkingMatch = !filters.parking || hotel.features?.parking === true;
    const restaurantMatch = !filters.restaurant || hotel.features?.restaurant === true;

    return typeMatch && priceMatch && ratingMatch && parkingMatch && restaurantMatch;
  });
};

// Example usage
const filteredHotels1 = filterHotels(hotels?.roomProperty, filters);
const filteredHotels2 = filterHotels(otherRelatedHotels, filters);




  

  return (
    <div className="flex flex-col bg-gray-100 md:flex-row gap-6 px-4 py-6">
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <div className="flex-1 space-y-4">
        {filteredHotels1?.map((hotel) => (
          <HotelCard hotel={hotel} key={hotel.id} />
        ))}



        {/* otherRealated hotels */}
        {filteredHotels2?.map((hotel) => (
          <HotelCard hotel={hotel} key={hotel.id} />
        ))}
        
       
        
        {filteredHotels1 === 0 && <p>No hotels match your filters.</p>}
      </div>
    </div>
  );
}
