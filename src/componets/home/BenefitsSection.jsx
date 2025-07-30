
import { CheckCircle } from "lucide-react";

const benefits = [
  {
    title: "24/7 Booking Access",
    description: "Allow guests to book rooms anytime, anywhere without phone calls or in-person visits.",
  },
  {
    title: "Zero Commission Fees",
    description: "Keep 100% of the revenue by avoiding third-party platforms like Booking.com or OYO.",
  },
  {
    title: "Real-Time Availability",
    description: "Display live room status and avoid double bookings or overbooking issues.",
  },
  {
    title: "Better User Experience",
    description: "Mobile-friendly design with fast, smooth navigation for increased bookings.",
  },
  {
    title: "Secure Online Payments",
    description: "Accept payments using Razorpay, Stripe, or other gateways to confirm bookings instantly.",
  },
  {
    title: "Automated Booking Management",
    description: "Instant notifications and easy admin tools to manage or cancel bookings.",
  },
//   {
//     title: "Customer Data Collection",
//     description: "Collect guest info for feedback, loyalty offers, and targeted marketing.",
//   },
//   {
//     title: "Search Engine Visibility",
//     description: "Rank your hotel on Google and get free traffic from search results.",
//   },
//   {
//     title: "Competitive Edge",
//     description: "Stand out with a modern, trustworthy site that builds customer confidence.",
//   },
];

export default function HotelBenefitsSection() {
  return (
    <section className="w-full bg-white dark:bg-gray-500 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
          Benefits of Having a Hotel Booking Website
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          A dedicated booking platform improves efficiency, increases revenue, and enhances the customer experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4 text-green-600 dark:text-green-400">
                <CheckCircle className="w-5 h-5 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
