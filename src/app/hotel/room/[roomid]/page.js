"use client"

// import { useParams } from 'next/navigation'
import React from 'react'
import data from '@/data'
import RoomImageGrid from '@/componets/singleroom/RoomImageGrid'
import HotelMap from '@/componets/singleroom/HotelMap'
import HotelRating from '@/componets/singleroom/HotelRating'
import FAQSecton from '@/componets/singleroom/FAQSecton'



export default function page({ params }) {
const { roomid } = React.use(params); 
  
  let roomData = data?.flatMap(x=>x.roomProperty).find(x=>String(x?.id) === String(roomid))
 
  return (
    <>
    
     <div className="md:p-10 p-3 bg-gray-100">
    <RoomImageGrid data={roomData}  />

    <HotelRating data={roomData}/>
    <FAQSecton/>
    <HotelMap data={roomData}/> 
     
    </div>
    
    </>
  )
}
