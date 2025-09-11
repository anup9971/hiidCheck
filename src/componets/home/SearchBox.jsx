// "use client";

// import { useSearch } from "@/app/context/SearchContext";
// import { FaMinus, FaPlus } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function SearchBox() {
//   const router = useRouter();
//   const { searchData, setSearchData } = useSearch();
//   const [error, setError] = useState("");


//   useEffect(() => {
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     if (!searchData.checkIn)
//       setSearchData((prev) => ({
//         ...prev,
//         checkIn: today.toISOString().split("T")[0],
//       }));

//     if (!searchData.checkOut)
//       setSearchData((prev) => ({
//         ...prev,
//         checkOut: tomorrow.toISOString().split("T")[0],
//       }));
//   }, []);

//   const LIMITS = {
//     adult: { min: 1, max: 2 },
//     child: { min: 0, max: 2 },
//     room: { min: 1, max: 10 },
//   };

//   const updateValue = (type, action) => {
//     let current = searchData[type];
//     let { min, max } = LIMITS[type] || {};
//     let newValue = action === "minus" ? current - 1 : current + 1;

//     if (newValue < min) return alert(`${type} cannot be less than ${min}`);
//     if (newValue > max) return alert(`${type} cannot be more than ${max}`);

//     setSearchData({ ...searchData, [type]: newValue });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!searchData.checkIn || !searchData.checkOut) {
//       setError("Please select both Check-in and Check-out dates!");
//       return;
//     }
//     setError("");
//     router.push("/search");
//   };


//   const todayStr = new Date().toISOString().split("T")[0];
//   const checkOutMin = searchData.checkIn || todayStr;

//   return (
//     <section className="w-full text-black py-10  px-4 md:px-12 lg:px-24">
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-4 items-end bg-gray-100 p-6 rounded-xl shadow-lg"
//       >
       
//         <div className="flex flex-col">
//           <label className="text-gray-700 mb-1 font-medium">Check-in</label>
//           <input
//             type="date"
//             value={searchData.checkIn}
//             min={todayStr}
//             onChange={(e) => {
//               const newCheckIn = e.target.value;
//               let newCheckOut = searchData.checkOut;

      
//               if (new Date(newCheckOut) <= new Date(newCheckIn)) {
//                 const nextDay = new Date(newCheckIn);
//                 nextDay.setDate(nextDay.getDate() + 1);
//                 newCheckOut = nextDay.toISOString().split("T")[0];
//               }

//               setSearchData({
//                 ...searchData,
//                 checkIn: newCheckIn,
//                 checkOut: newCheckOut,
//               });
//             }}
//             className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
//           />
//         </div>

      
//         <div className="flex flex-col">
//           <label className="text-gray-700 mb-1 font-medium">Check-out</label>
//           <input
//             type="date"
//             value={searchData.checkOut}
//             min={checkOutMin}
//             onChange={(e) =>
//               setSearchData({ ...searchData, checkOut: e.target.value })
//             }
//             className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
//           />
//         </div>


//         <div className="flex flex-col">
//           <label className="text-gray-700 mb-1 font-medium">Adult</label>
//           <div className="flex items-center justify-between h-[50px] border border-gray-300 rounded-md px-3">
//             <button
//               type="button"
//               onClick={() => updateValue("adult", "minus")}
//               className="p-2 hover:bg-gray-200 rounded"
//             >
//               <FaMinus />
//             </button>
//             <span className="font-medium">{searchData.adult}</span>
//             <button
//               type="button"
//               onClick={() => updateValue("adult", "plus")}
//               className="p-2 hover:bg-gray-200 rounded"
//             >
//               <FaPlus />
//             </button>
//           </div>
//         </div>

     
//         <div className="flex flex-col">
//           <label className="text-gray-700 mb-1 font-medium">Child</label>
//           <div className="flex items-center justify-between h-[50px] border border-gray-300 rounded-md px-3">
//             <button
//               type="button"
//               onClick={() => updateValue("child", "minus")}
//               className="p-2 hover:bg-gray-200 rounded"
//             >
//               <FaMinus />
//             </button>
//             <span className="font-medium">{searchData.child}</span>
//             <button
//               type="button"
//               onClick={() => updateValue("child", "plus")}
//               className="p-2 hover:bg-gray-200 rounded"
//             >
//               <FaPlus />
//             </button>
//           </div>
//         </div>

  
//         <div className="flex flex-col">
//           <label className="text-gray-700 mb-1 font-medium">Room</label>
//           <div className="flex items-center justify-between h-[50px] border border-gray-300 rounded-md px-3">
//             <button
//               type="button"
//               onClick={() => updateValue("room", "minus")}
//               className="p-2 hover:bg-gray-200 rounded"
//             >
//               <FaMinus />
//             </button>
//             <span className="font-medium">{searchData.room}</span>
//             <button
//               type="button"
//               onClick={() => updateValue("room", "plus")}
//               className="p-2 hover:bg-gray-200 rounded"
//             >
//               <FaPlus />
//             </button>
//           </div>
//         </div>

      
//         <button
//           type="submit"
//           className="w-full md:col-span-1 border border-gray-700 text-gray-700 py-3 px-4 rounded-md hover:bg-black hover:text-white transition"
//         >
//           Search
//         </button>

    
//         {error && <p className="col-span-6 text-red-600 text-sm">{error}</p>}
//       </form>
//     </section>
//   );
// }













// "use client";

// import { useSearch } from "@/app/context/SearchContext";
// import { FaMinus, FaPlus } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { CalendarDaysIcon, UserGroupIcon } from "@heroicons/react/24/outline";

// export default function SearchBox() {
//   const router = useRouter();
//   const { searchData, setSearchData } = useSearch();
//   const [showDateModal, setShowDateModal] = useState(false);
//   const [showTravellerModal, setShowTravellerModal] = useState(false);

//   const todayStr = new Date().toISOString().split("T")[0];

//   useEffect(() => {
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     if (!searchData.checkIn)
//       setSearchData((prev) => ({
//         ...prev,
//         checkIn: today.toISOString().split("T")[0],
//       }));

//     if (!searchData.checkOut)
//       setSearchData((prev) => ({
//         ...prev,
//         checkOut: tomorrow.toISOString().split("T")[0],
//       }));
//   }, []);

//   const LIMITS = {
//     adult: { min: 1, max: 5 },
//     child: { min: 0, max: 5 },
//     room: { min: 1, max: 10 },
//   };

//   const updateValue = (type, action) => {
//     let current = searchData[type];
//     let { min, max } = LIMITS[type] || {};
//     let newValue = action === "minus" ? current - 1 : current + 1;

//     if (newValue < min || newValue > max) return;
//     setSearchData({ ...searchData, [type]: newValue });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     router.push("/search");
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "";
//     let d = new Date(dateStr);
//     return d.toLocaleDateString("en-GB", {
//       day: "numeric",
//       month: "short",
//     });
//   };

//   return (
//     <section className="w-full text-black py-4 px-3 md:px-12 lg:px-24">
//       {/* 🖥️ Desktop */}
//       <form
//         onSubmit={handleSubmit}
//         className="hidden md:grid md:grid-cols-6 gap-4 items-end bg-gray-100 p-6 rounded-xl shadow-lg"
//       >
//         {/* Check-in */}
//         <div className="flex flex-col">
//           <label className="text-gray-700 mb-1 font-medium">Check-in</label>
//           <input
//             type="date"
//             value={searchData.checkIn}
//             min={todayStr}
//             onChange={(e) =>
//               setSearchData({ ...searchData, checkIn: e.target.value })
//             }
//             className="w-full p-3 rounded-md border border-gray-300"
//           />
//         </div>

//         {/* Check-out */}
//         <div className="flex flex-col">
//           <label className="text-gray-700 mb-1 font-medium">Check-out</label>
//           <input
//             type="date"
//             value={searchData.checkOut}
//             min={searchData.checkIn || todayStr}
//             onChange={(e) =>
//               setSearchData({ ...searchData, checkOut: e.target.value })
//             }
//             className="w-full p-3 rounded-md border border-gray-300"
//           />
//         </div>

//         {/* Adults */}
//         <div className="flex flex-col">
//           <label className="text-gray-700 mb-1 font-medium">Adult</label>
//           <div className="flex items-center justify-between h-[50px] border border-gray-300 rounded-md px-3">
//             <button type="button" onClick={() => updateValue("adult", "minus")}>
//               <FaMinus />
//             </button>
//             <span className="font-medium">{searchData.adult}</span>
//             <button type="button" onClick={() => updateValue("adult", "plus")}>
//               <FaPlus />
//             </button>
//           </div>
//         </div>

//         {/* Child */}
//         <div className="flex flex-col">
//           <label className="text-gray-700 mb-1 font-medium">Child</label>
//           <div className="flex items-center justify-between h-[50px] border border-gray-300 rounded-md px-3">
//             <button type="button" onClick={() => updateValue("child", "minus")}>
//               <FaMinus />
//             </button>
//             <span className="font-medium">{searchData.child}</span>
//             <button type="button" onClick={() => updateValue("child", "plus")}>
//               <FaPlus />
//             </button>
//           </div>
//         </div>

//         {/* Rooms */}
//         <div className="flex flex-col">
//           <label className="text-gray-700 mb-1 font-medium">Room</label>
//           <div className="flex items-center justify-between h-[50px] border border-gray-300 rounded-md px-3">
//             <button type="button" onClick={() => updateValue("room", "minus")}>
//               <FaMinus />
//             </button>
//             <span className="font-medium">{searchData.room}</span>
//             <button type="button" onClick={() => updateValue("room", "plus")}>
//               <FaPlus />
//             </button>
//           </div>
//         </div>

//         {/* Search Button */}
//         <button
//           type="submit"
//           className="w-full border border-gray-700 text-gray-700 py-3 px-4 rounded-md hover:bg-black hover:text-white transition"
//         >
//           Search
//         </button>
//       </form>

//       {/* 📱 Mobile */}
//       <div className="md:hidden space-y-3 bg-white p-4 rounded-2xl shadow-lg">
//         {/* Dates */}
//         <div
//           className="border border-gray-300 p-3 rounded-xl flex justify-between items-center shadow-sm"
//           onClick={() => setShowDateModal(true)}
//         >
//           <div className="flex items-center gap-2">
//             <CalendarDaysIcon className="h-5 w-5 text-blue-600" />
//             <span className="text-gray-600">Dates</span>
//           </div>
//           <span className="font-semibold">
//             {formatDate(searchData.checkIn)} - {formatDate(searchData.checkOut)}
//           </span>
//         </div>

//         {/* Travellers */}
//         <div
//           className="border border-gray-300 p-3 rounded-xl flex justify-between items-center shadow-sm"
//           onClick={() => setShowTravellerModal(true)}
//         >
//           <div className="flex items-center gap-2">
//             <UserGroupIcon className="h-5 w-5 text-blue-600" />
//             <span className="text-gray-600">Travellers</span>
//           </div>
//           <span className="font-semibold">
//             {searchData.adult + searchData.child} Guests, {searchData.room} Room
//           </span>
//         </div>

//         {/* Search Button */}
//         <button
//           onClick={handleSubmit}
//           className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-md"
//         >
//           🔍 Search Hotels
//         </button>
//       </div>

//       {/* 📅 Date Modal (Full screen on mobile) */}
//       {showDateModal && (
//         <div className="fixed inset-0 bg-white z-50 flex flex-col p-6">
//           <h3 className="font-bold text-lg mb-4">Select Dates</h3>
//           <input
//             type="date"
//             value={searchData.checkIn}
//             min={todayStr}
//             onChange={(e) =>
//               setSearchData({ ...searchData, checkIn: e.target.value })
//             }
//             className="border p-3 w-full rounded-lg mb-3"
//           />
//           <input
//             type="date"
//             value={searchData.checkOut}
//             min={searchData.checkIn || todayStr}
//             onChange={(e) =>
//               setSearchData({ ...searchData, checkOut: e.target.value })
//             }
//             className="border p-3 w-full rounded-lg"
//           />
//           <button
//             onClick={() => setShowDateModal(false)}
//             className="mt-auto py-3 rounded-xl bg-blue-600 text-white font-bold"
//           >
//             Done
//           </button>
//         </div>
//       )}

//       {/* 👨‍👩‍👧 Travellers Modal (Full screen on mobile) */}
//       {showTravellerModal && (
//         <div className="fixed inset-0 bg-white z-50 flex flex-col p-6">
//           <h3 className="font-bold text-lg mb-4">Travellers & Rooms</h3>

//           {["adult", "child", "room"].map((type) => (
//             <div
//               key={type}
//               className="flex justify-between items-center mb-4 border-b pb-2"
//             >
//               <span className="capitalize font-medium">{type}</span>
//               <div className="flex items-center gap-3">
//                 <button
//                   className="p-2 bg-gray-200 rounded-full"
//                   onClick={() => updateValue(type, "minus")}
//                 >
//                   <FaMinus />
//                 </button>
//                 <span className="w-8 text-center">{searchData[type]}</span>
//                 <button
//                   className="p-2 bg-gray-200 rounded-full"
//                   onClick={() => updateValue(type, "plus")}
//                 >
//                   <FaPlus />
//                 </button>
//               </div>
//             </div>
//           ))}

//           <button
//             onClick={() => setShowTravellerModal(false)}
//             className="mt-auto py-3 rounded-xl bg-blue-600 text-white font-bold"
//           >
//             Apply
//           </button>
//         </div>
//       )}
//     </section>
//   );
// }










"use client";

import { useSearch } from "@/app/context/SearchContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CalendarDaysIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function SearchBox() {
  const router = useRouter();
  const { searchData, setSearchData } = useSearch();
  const [error, setError] = useState("");
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTravellerModal, setShowTravellerModal] = useState(false);

  // ✅ Default Dates (Check-in today, Check-out tomorrow)
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (!searchData.checkIn)
      setSearchData((prev) => ({
        ...prev,
        checkIn: today.toISOString().split("T")[0],
      }));

    if (!searchData.checkOut)
      setSearchData((prev) => ({
        ...prev,
        checkOut: tomorrow.toISOString().split("T")[0],
      }));
  }, []);

  // ✅ Limits for traveller fields
  const LIMITS = {
    adult: { min: 1, max: 2 },
    child: { min: 0, max: 2 },
    room: { min: 1, max: 10 },
  };

  // ✅ Update Adult/Child/Room Values
  const updateValue = (type, action) => {
    let current = searchData[type];
    let { min, max } = LIMITS[type] || {};
    let newValue = action === "minus" ? current - 1 : current + 1;

    if (newValue < min) return alert(`${type} cannot be less than ${min}`);
    if (newValue > max) return alert(`${type} cannot be more than ${max}`);

    setSearchData({ ...searchData, [type]: newValue });
  };

  // ✅ Search Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchData.checkIn || !searchData.checkOut) {
      setError("Please select both Check-in and Check-out dates!");
      return;
    }
    setError("");
    router.push("/search");
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const checkOutMin = searchData.checkIn || todayStr;

  // ✅ Date formatting for mobile display
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    let d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <section className="w-full bg-white mt-[-4px]  text-black py-4 px-3 md:px-12 lg:px-24">
      {/* 🖥️ Desktop */}
      <form
        onSubmit={handleSubmit}
        className="hidden md:grid md:grid-cols-6 gap-4 items-end bg-gray-100 p-6 rounded-xl shadow-lg"
      >
        {/* Check-in */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Check-in</label>
          <input
            type="date"
            value={searchData.checkIn}
            min={todayStr}
            onChange={(e) =>
              setSearchData({ ...searchData, checkIn: e.target.value })
            }
            className="w-full p-3 rounded-md border border-gray-300"
          />
        </div>

        {/* Check-out */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Check-out</label>
          <input
            type="date"
            value={searchData.checkOut}
            min={checkOutMin}
            onChange={(e) =>
              setSearchData({ ...searchData, checkOut: e.target.value })
            }
            className="w-full p-3 rounded-md border border-gray-300"
          />
        </div>

        {/* Adults */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Adult</label>
          <div className="flex items-center justify-between h-[50px] border border-gray-300 rounded-md px-3">
            <button type="button" onClick={() => updateValue("adult", "minus")}>
              <FaMinus />
            </button>
            <span className="font-medium">{searchData.adult}</span>
            <button type="button" onClick={() => updateValue("adult", "plus")}>
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Child */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Child</label>
          <div className="flex items-center justify-between h-[50px] border border-gray-300 rounded-md px-3">
            <button type="button" onClick={() => updateValue("child", "minus")}>
              <FaMinus />
            </button>
            <span className="font-medium">{searchData.child}</span>
            <button type="button" onClick={() => updateValue("child", "plus")}>
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Rooms */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Room</label>
          <div className="flex items-center justify-between h-[50px] border border-gray-300 rounded-md px-3">
            <button type="button" onClick={() => updateValue("room", "minus")}>
              <FaMinus />
            </button>
            <span className="font-medium">{searchData.room}</span>
            <button type="button" onClick={() => updateValue("room", "plus")}>
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full border border-gray-700 text-gray-700 py-3 px-4 rounded-md hover:bg-black hover:text-white transition"
        >
          Search
        </button>
      </form>

      {/* 📱 Mobile */}
      <div className="md:hidden space-y-3 bg-white p-4 rounded-2xl shadow-lg">
        {/* Dates */}
        <div
          className="border border-gray-300 p-3 rounded-xl flex justify-between items-center shadow-sm"
          onClick={() => setShowDateModal(true)}
        >
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-5 w-5 text-[#5f8575]" />
            <span className="text-gray-600">Dates</span>
          </div>
          <span className="font-semibold">
            {formatDate(searchData.checkIn)} - {formatDate(searchData.checkOut)}
          </span>
        </div>

        {/* Travellers */}
        <div
          className="border border-gray-300 p-3 rounded-xl flex justify-between items-center shadow-sm"
          onClick={() => setShowTravellerModal(true)}
        >
          <div className="flex items-center gap-2">
            <UserGroupIcon className="h-5 w-5 text-[#5f8575]" />
            <span className="text-gray-600">Travellers</span>
          </div>
          <span className="font-semibold">
            {searchData.adult + searchData.child} Guests, {searchData.room} Room
          </span>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5f8575] to-[#5f8575] text-white font-bold shadow-md"
        >
         Search Hotel
        </button>
      </div>

      {/* 📅 Date Modal */}
      {showDateModal && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-6">
          <h3 className="font-bold text-lg mb-4">Select Dates</h3>
          <input
            type="date"
            value={searchData.checkIn}
            min={todayStr}
            onChange={(e) =>
              setSearchData({ ...searchData, checkIn: e.target.value })
            }
            className="border p-3 w-full rounded-lg mb-3"
          />
          <input
            type="date"
            value={searchData.checkOut}
            min={checkOutMin}
            onChange={(e) =>
              setSearchData({ ...searchData, checkOut: e.target.value })
            }
            className="border p-3 w-full rounded-lg"
          />
          <button
            onClick={() => setShowDateModal(false)}
            className="mt-auto py-3 rounded-xl bg-[#5f8575] text-white font-bold"
          >
            Done
          </button>
        </div>
      )}

      {/* 👨‍👩‍👧 Travellers Modal */}
      {showTravellerModal && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-6">
          <h3 className="font-bold text-lg mb-4">Travellers & Rooms</h3>

          {["adult", "child", "room"].map((type) => (
            <div
              key={type}
              className="flex justify-between items-center mb-4 border-b pb-2"
            >
              <span className="capitalize font-medium">{type}</span>
              <div className="flex items-center gap-3">
                <button
                  className="p-2 bg-gray-200 rounded-full"
                  onClick={() => updateValue(type, "minus")}
                >
                  <FaMinus />
                </button>
                <span className="w-8 text-center">{searchData[type]}</span>
                <button
                  className="p-2 bg-gray-200 rounded-full"
                  onClick={() => updateValue(type, "plus")}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => setShowTravellerModal(false)}
            className="mt-auto py-3 rounded-xl bg-[#5f8575] text-white font-bold"
          >
            Apply
          </button>
        </div>
      )}

      {error && (
        <p className="col-span-6 text-red-600 text-sm text-center mt-2">
          {error}
        </p>
      )}
    </section>
  );
}


