"use client";

import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

// ✅ Counter Component
function Counter({ label, value, onChange, min, max }) {
  const handleChange = (action) => {
    let newValue = action === "minus" ? value - 1 : value + 1;

    if (newValue < min) {
      alert(`${label} cannot be less than ${min}`);
      return;
    }
    if (newValue > max) {
      alert(`${label} cannot be more than ${max}`);
      return;
    }

    onChange(newValue);
  };

  return (
    <div className="flex flex-col w-full md:mt-5">
      <label className="text-gray-700 mb-1 font-medium">{label}</label>
      <div className="p-3 flex justify-around md:justify-between items-center rounded-md border md:h-[50px] text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full">
        <button
          type="button"
          onClick={() => handleChange("minus")}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <FaMinus />
        </button>
        <span className="font-medium">{value}</span>
        <button
          type="button"
          onClick={() => handleChange("plus")}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default function CheckAvailbilty() {
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [room, setRoom] = useState(1);

  return (
    <section className="w-full  py-10 px-4 md:px-12 lg:px-24">
      <form className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-gray-100 p-6 rounded-xl shadow-lg">
        {/* ✅ Adult */}
        <Counter label="Adult" value={adult} onChange={setAdult} min={1} max={4} />

        {/* ✅ Child */}
        <Counter label="Child" value={child} onChange={setChild} min={0} max={3} />

        {/* ✅ Room */}
        <Counter label="Room" value={room} onChange={setRoom} min={1} max={5} />
      </form>
    </section>
  );
}
