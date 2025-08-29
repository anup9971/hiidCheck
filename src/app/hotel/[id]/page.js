"use client";
import { useState } from "react";

import HotelCard from "@/componets/search/HotelCard";
import FilterSidebar from "@/componets/search/FilterSidebar";
import data from "@/data";
import { useParams } from "next/navigation";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import ReviewCard from "@/componets/singleroom/ReviewCard";
import HotelRating from "@/componets/singleroom/HotelRating";
import FoodAmenities from "@/componets/hotel/FoodAmenities";
import FAQSecton from "@/componets/singleroom/FAQSecton";
import HotelPropertyPolicies from "@/componets/hotel/HotelPropertyPolicies";
import ImageSlider from "@/componets/hotel/ImageSlider";

export default function HotelPage() {
   let param = useParams()

  //   Related Hotel  ---------------------
  let hotels = data?.find((x)=>x?.id ==param?.id)
   
  // let OtherHotels = data.flat().filter((item)=> String(item.id) !== String(param.id))

  //  let otherRelatedHotels = OtherHotels.flatMap((hotel)=>hotel.roomProperty)
   
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
// const filteredHotels2 = filterHotels(otherRelatedHotels, filters);


  return (
    <>
     <div className="bg-white">

      <div className=" bg-white md:grid grid-cols-2 h-auto px-4 ">
        <div >
             {/* <Image src={hotels.image} alt="sing hotel img"
              width={100}
              height={150}
              className="w-full rounded  md:h-[400px]"
             /> */}

             <ImageSlider hotels={hotels}/>
        </div>  

        {/* ------------------right section------------------------ */}
        <div className="md:p-8 p-1">
        <div className="space-y-4  "> 
         <p className="flex gap-2 text-gray-500 mb-[0px]"> ⭐️⭐️⭐️  👍</p>
        <h2 className="text-2xl text-gray-800 font-bold">{hotels.name}</h2>
         <p className="flex gap-2 text-gray-500"> <IoLocationSharp /> {hotels.location}</p>
        <p className="text-gray-700 text-justify">
         {hotels.description}
        </p>
        <p className="text-gray-700 text-justify">
         <span className="text-gray-600 font-semibold">Essential Facilities: </span>{hotels.hotelDescription}
        </p>
        

          {/* Amenities  */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {hotels.hotelAmenities?.map((facility, index) => (
        <div
          key={index}
          className="flex items-center gap-2 border border-gray-600 rounded-lg px-3 py-2 hover:shadow hover:bg-gray-50 transition"
        >
          {/* <img
            src={facility}
            alt={facility.name}
            className="w-5 h-5 object-contain"
          /> */}
          <span className="text-sm text-gray-700">{facility} </span>
        </div>
      ))}
       </div>


        <div className="text-lg font-semibold text-green-600  ">
         {/* <span>   &#8377; {hotels.price} / night</span> */}
          {/* <Link href={`/hotel/room/${hotels.id}/booking`}>
          <span className="bg-green-700 hover:bg-green-900 float-end text-white p-2 rounded">Reserve</span>
          </Link> */}
        </div>
      </div>
        </div>     
     </div>


    <div className="flex flex-col bg-gray-100 md:flex-row gap-6 px-4 py-6">

      
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <div className="flex-1 space-y-4">
        {filteredHotels1?.map((rooms) => (
          <HotelCard rooms={rooms} key={rooms.id} />
        ))}


       
       
        
        {filteredHotels1 === 0 && <p>No hotels match your filters.</p>}
      </div>
    </div>


    {/* another componets called */}

       <FoodAmenities hotels={hotels}/>
       <HotelRating hotels={hotels}/>
       <HotelPropertyPolicies/>
      <FAQSecton/>
       
     </div>
    </>
  );
}
