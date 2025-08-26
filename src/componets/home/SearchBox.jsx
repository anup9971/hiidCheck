"use client";

import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function SearchBox() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adult, setAdult]= useState(1);
  const [child, setChild]= useState(0);
   
  const LIMITS = {
    adult: { min: 1, max: 3 },
    child: { min: 0, max: 3 },
  };
   

  function updateValue(type, action){
    console.log(action, type )
    let current = type ==="adult" ? adult :child
    let {min,max}=LIMITS[type]
    let newValue = action ==="minus"? current-1 :current+1
   
    if(newValue <min){
      alert(`${type} Can not be minumum ${1}`)
      return;
    }
    if(newValue>max){
      alert(`${type} Can not be maximun ${3}`)
      return;
    }

    if(type ==="adult") setAdult(newValue)
    if(type ==="child") setChild(newValue)

     
  }

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log({ destination, checkIn, checkOut });
  };

  return (
   <section className="w-full bg-white py-10 px-4 md:px-12 lg:px-24">
  <form
    onSubmit={handleSearch}
    className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-gray-100 p-6 rounded-xl shadow-lg"
  >
    {/* Check-in */}
    <div className="flex flex-col relative w-full col-span-1">
      <label className="text-gray-700 mb-1 font-medium">Check-in</label>
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className={`w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
          !checkIn ? "text-gray-500" : "text-black"
        }`}
      />
      {!checkIn && (
        <span className="md:hidden absolute left-3 top-10 text-gray-500 pointer-events-none">
          dd-mm-yyyy
        </span>
      )}
    </div>

    {/* Check-out */}
    <div className="flex flex-col relative w-full col-span-1">
      <label className="text-gray-700 mb-1 font-medium">Check-out</label>
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className={`w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
          !checkOut ? "text-gray-500" : "text-black"
        }`}
      />
      {!checkOut && (
        <span className="md:hidden absolute left-3 top-10 text-gray-500 pointer-events-none">
          dd-mm-yyyy
        </span>
      )}
    </div>


    {/* Adult + Child */}
    <div className="flex flex-col md:flex-row gap-4 w-full col-span-1">
      {/* Adult */}
      <div className="flex flex-col w-full md:mt-5">
        <label className="text-gray-700 mb-1 font-medium">Adult</label>
        <div className="p-3 flex justify-around md:justify-between  md:h-[50px] items-center rounded-md border  text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full">
          <button type="button" onClick={() => updateValue("adult", "minus")} className="p-2 hover:bg-gray-200 rounded">
            <FaMinus />
          </button>
          <span className="font-medium">{adult}</span>
          <button type="button" onClick={() => updateValue("adult", "plus")} className="p-2 hover:bg-gray-200 rounded">
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Child */}
      <div className="flex flex-col w-full md:mt-5">
        <label className="text-gray-700 mb-1 font-medium">Child</label>
        <div className="p-3 flex justify-around md:justify-between items-center rounded-md border md:h-[50px] text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full">
          <button type="button" onClick={() => updateValue("child", "minus")} className="p-2 hover:bg-gray-200 rounded">
            <FaMinus />
          </button>
          <span className="font-medium">{child}</span>
          <button type="button" onClick={() => updateValue("child", "plus")} className="p-2 hover:bg-gray-200 rounded">
            <FaPlus />
          </button>
        </div>
      </div>
    </div>

    {/* Search Button (just 1 col on desktop) */}
    <button
      type="submit"
      className="w-full border border-gray-700 text-gray-700 py-3 px-4 rounded-md hover:bg-black hover:text-white transition col-span-1"
    >
      Search
    </button>
  </form>
</section>

  );
}
