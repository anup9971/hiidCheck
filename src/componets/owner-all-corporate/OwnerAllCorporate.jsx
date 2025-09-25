"use client";

import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import OwnerProfileSideBar from "../ownerProfileDashboard/OwnerProfileSideBar";
import { useRouter } from "next/navigation";
import ownerFechData from "@/app/admin/ownerFetchData";
import { formatDate } from "@/app/untils/formatDate";

export default function OwnerAllCorporateCards() {
  let {owner} = ownerFechData()

    let router = useRouter()

  const initialCorporates = [
    {
      _id: "c1",
      companyName: "Tech Solutions Ltd.",
      contactPerson: "Rahul Sharma",
      email: "rahul@techsolutions.com",
      phone: "9876543210",
      industry: "IT",
      employees: 150,
      status: "Active",
      logo: "/images/corporate1.jpg", // optional logo
    },
    {
      _id: "c2",
      companyName: "Global Enterprises",
      contactPerson: "Anita Singh",
      email: "anita@global.com",
      phone: "9123456780",
      industry: "Manufacturing",
      employees: 300,
      status: "Inactive",
      logo: "/images/corporate2.jpg",
    },
    {
      _id: "c2",
      companyName: "Global Enterprises",
      contactPerson: "Anita Singh",
      email: "anita@global.com",
      phone: "9123456780",
      industry: "Manufacturing",
      employees: 300,
      status: "Inactive",
      logo: "/images/corporate2.jpg",
    },
    {
      _id: "c3",
      companyName: "Creative Labs",
      contactPerson: "Alex Johnson",
      email: "alex@creativelabs.com",
      phone: "9988776655",
      industry: "Marketing",
      employees: 80,
      status: "Active",
      logo: "/images/corporate3.jpg",
    },
  ];

  const [corporates, setCorporates] = useState(initialCorporates);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this corporate client?")) {
      setCorporates(corporates.filter((c) => c._id !== id));
    }
  };

  return (
    <div className="min-h-screen text-black mt-[-4px] pt-20 pb-25 bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-95 p-4">
        <p className="text-2xl font-bold mb-6 text-center md:text-left">Owner Profile</p>
        <OwnerProfileSideBar owner={owner} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          All Corporates
        </h1>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {corporates.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Corporate Logo */}
              {c.logo && (
                <img
                  src={c.logo}
                  alt={c.companyName}
                  className="w-full h-40 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{c.companyName}</h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Contact:</span> {c.contactPerson}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Email:</span> {c.email}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Phone:</span> {c.phone}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Industry:</span> {c.industry}
                </p>
                <p className="text-gray-600 mb-3">
                  <span className="font-medium">Employees:</span> {c.employees}
                </p>
                <p
                  className={`inline-block px-2 py-1 rounded text-white font-semibold mb-3 ${
                    c.status === "Active" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {c.status}
                </p>

                <div className="flex gap-2">
                  <button onClick={()=> router.push(`/owner-update-corporate/${c._id}`) } className="flex-1 bg-[#5f8575] text-white px-3 py-2 rounded flex items-center justify-center gap-1">
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded flex items-center justify-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
