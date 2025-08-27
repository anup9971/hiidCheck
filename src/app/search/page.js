"use client"
import SearchBox from '@/componets/home/SearchBox'
import FilterSidebar from '@/componets/search/FilterSidebar'
import HotelCard from '@/componets/search/HotelCard'
import data from '@/data'
import React, { useState } from 'react'

export default function page() {
  let hotels = data?.flatMap((hotel)=>hotel.roomProperty)
 
  
 const [filters, setFilters] = useState({
    type: "",
    maxPrice: 10000,
    minRating: 0,
    parking: false,
    restaurant: false,
  });


  const filtered = hotels?.filter((hotel) => {
  const typeMatch = !filters.type || hotel.propertyType?.toLowerCase() === filters.type.toLowerCase();
  const priceMatch = !filters.maxPrice || hotel.price <= filters.maxPrice;
  const ratingMatch = !filters.minRating || hotel.rating >= filters.minRating;
  const parkingMatch = !filters.parking || hotel.features?.parking === true;
  const restaurantMatch = !filters.restaurant || hotel.features?.restaurant === true;

  return typeMatch && priceMatch && ratingMatch && parkingMatch && restaurantMatch;
});
  return (
    <>
       <SearchBox/> 
          <div className="flex flex-col bg-gray-100 md:flex-row gap-6 px-4 py-6">
               <FilterSidebar filters={filters} setFilters={setFilters} />
               <div className="flex-1 space-y-4">
                 {filtered ?.map((hotel) => (
                   <HotelCard hotel={hotel} key={hotel.id} />
                 ))}
                 {filtered  === 0 && <p>No hotels match your filters.</p>}
               </div>
             </div>
    </>
  )
}
