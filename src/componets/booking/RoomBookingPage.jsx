"use client";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState, useEffect } from "react";
import FormData from "@/componets/booking/FromData"
export default function BookingPage() {
  const [bookingData, setBookingData] = useState(null);
  let [down, setDown]= useState(false)

  // Fetch booking data from localStorage
  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data) setBookingData(JSON.parse(data));
  }, []);

  if (!bookingData) return <p>Loading...</p>;






  // Destructure data for easy use
  const { checkIn, checkOut, nights, rooms, adults, totalPrice, child ,gst, subTotal } = bookingData;
  // let  gst = totalPrice%100*12 
 
  
  

  return (
    <div className="max-w-7xl mx-auto bg-white text-black px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Guest Form */}
           <FormData/>


        {/* Right: Booking Summary */}
        <div className="bg-gray-50 p-6 rounded-lg shadow space-y-4">
          <h3 className="font-semibold text-lg mb-2">Your Booking Details 
            {/* <span onClick={(x)=>setDown((x)=> !x)} className="text-[10px] flex float-end text-blue-600 underline hover:cursor-pointer  font-light">View Full details  { down ?(<IoIosArrowUp className="text-[15px]" />):(<IoIosArrowDown className="text-[15px]" />) }  </span> */}
          </h3>
          <hr  className="text-gray-200"/>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {/* <p>Base Price (1)</p> */}
            <span>Check-In</span>
            <span className="font-semibold">{new Date(checkIn).toDateString()} <span className="font-normal">  (1 PM)</span></span>
            <span>Check-Out</span>
            <span className="font-semibold">{new Date(checkOut).toDateString()} <span className="font-normal">  (11 AM)</span></span>
            <span>Total nights</span>
            <span className="font-semibold">{nights} Night</span>

            {/* hotel gst */}
             <span>{`Base Price (${rooms} Room x ${nights} night)`}</span>
            <span className="font-semibold">&#8377;{subTotal}/-</span>

             {/* hotel gst */}
             <span>Hotel GST 12%</span>
            <span className="font-semibold">&#8377;{gst}/-</span>
          </div>

          <p className="text-md">
            You selected: <span className="font-semibold">{rooms} Rooms</span> for  <span className="font-semibold">{adults} Adults </span> &  <span className="font-semibold">Childs {child}</span> 
          </p>

          <div className="bg-white p-4 rounded border">
            <h4 className="font-semibold">Total Amount to be paid</h4>
            <p className="text-2xl font-bold">₹ {totalPrice}</p>
            <p className="text-xs text-gray-500">Includes taxes and charges</p>
          </div>
        </div>
      </div>
    </div>
  );
}
