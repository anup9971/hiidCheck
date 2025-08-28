"use client";

import { CheckCircle } from "lucide-react";

export default function HotelPropertyPolicies() {
  const policies = [
    "Primary Guest should be atleast 18 years of age.",
    "Passport, Aadhaar and Driving License are accepted as ID proof(s)",
    "Pets are not allowed",
    "Outside food is not allowed",
    "Optional : Fee for buffet breakfast: approximately INR 850 for adults and INR 425 for children | Early check-in is available for a fee (subject to availability) | Late check-out is available for a fee (subject to availability) | Rollaway bed fee: INR 1500.0 per night",
  ];

  return (
    <>
    <div className="p-8">
      <div className="bg-white shadow text-gray-800 rounded-xl p-6 border border-gray-200">
      {/* Header */}
      <div className="md:flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Property Policies</h2>
        <div className="flex gap-4 text-sm">
          <span className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full font-medium">
            Check-in Time: <strong>2 PM</strong>
          </span>
          <span className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full font-medium">
            Check-out Time: <strong>12 PM</strong>
          </span>
        </div>
      </div>

      {/* Policy list */}
      <ul className="space-y-3 text-gray-700 text-sm">
        {policies.map((policy, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <span>{policy}</span>
          </li>
        ))}
      </ul>

      {/* Footer link */}
      
    </div>
    </div>
    </>
    
  );
}
