"use client";
import { useState } from "react";

export default function FilterSidebar({ filters, setFilters }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleApply = () => {
    setMobileOpen(false);
    // Filters are already applied with setFilters
  };

  const handleCancel = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="bg-[#487c66]  text-white px-4 py-2 rounded"
        >
          ☰ Filter
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-full h-[450px] md:w-64 p-4 border rounded bg-white shadow-sm">
        <SidebarContent filters={filters} setFilters={setFilters} />
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
          <div className="w-4/5 max-w-sm bg-white text-black h-full p-4 flex flex-col">
            <SidebarContent filters={filters} setFilters={setFilters} />

            {/* Cancel / Apply buttons */}
            <div className="mt-auto flex justify-between pt-4 border-t">
              <button
                className="px-4 py-2 border bg-red-600 text-white rounded "
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#487c66]  text-white rounded"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Extracted content so we can reuse in mobile + desktop
function SidebarContent({ filters, setFilters }) {
  return (
    <>
      <h3 className="font-bold text-black mb-4">Filter by:</h3>

      <div className="mb-3">
        <label className="block text-black font-medium">Property Type</label>
        <select
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="w-full text-black border px-2 py-1"
        >
          <option value="">All</option>
          <option value="Hotel">Hotel</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
        </select>
      </div>

      <div className="mb-3 text-black" >
        <label className="block font-medium">Price Range</label>
        <input
          type="range"
          min="200"
          max="6000"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: parseInt(e.target.value) })
          }
          className="w-full accent-[#5f8575]"
        />
        <p className="text-sm text-gray-600">Max ₹{filters.maxPrice}</p>
      </div>

      <div className="mb-3 text-black">
        <label className="block font-medium">Rating</label>
        <input 
          type="range"
          min="0"
          max="10"
          value={filters.minRating}
          onChange={(e) =>
            setFilters({ ...filters, minRating: parseFloat(e.target.value) })
          }
          className="w-full accent-[#5f8575]"
        />
        <p className="text-sm text-gray-600">Min ⭐ {filters.minRating}</p>
      </div>

      <div className="mb-3 text-black">
        <label>
          <input
            type="checkbox"
            checked={filters.parking}
            onChange={(e) =>
              setFilters({ ...filters, parking: e.target.checked })
            }
          />
          <span className="ml-2">Parking</span>
        </label>
      </div>

      <div className="mb-3 text-black">
        <label>
          <input
            type="checkbox"
            checked={filters.restaurant}
            onChange={(e) =>
              setFilters({ ...filters, restaurant: e.target.checked })
            }
          />
          <span className="ml-2">Restaurant</span>
        </label>
      </div>
    </>
  );
}
