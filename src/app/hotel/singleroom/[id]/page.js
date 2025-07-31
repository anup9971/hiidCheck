"use client"

import { useParams } from 'next/navigation'
import React from 'react'
import data from '@/data'
import RoomImageGrid from '@/componets/singleroom/RoomImageGrid'
import HotelMap from '@/componets/singleroom/HotelMap'
import HotelRating from '@/componets/singleroom/HotelRating'

export default function page() {
  let params = useParams()
  let roomData = data?.flatMap(x=>x.roomProperty)
                .find(x=>String(x?.id) === String(params?.id))
 
  return (
    <>
     <div className="md:p-10 p-3 bg-gray-100">
    <RoomImageGrid data={roomData}  />
    <HotelMap/> 
    <HotelRating data={roomData}/>
     
    </div>
    
    </>
  )
}
