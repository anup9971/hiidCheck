
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const features = [
  "Spacious conference halls",
  "High-speed Wi-Fi",
  "Audio-visual equipment",
  "On-site catering available",
  "Custom seating arrangements",
  "Air-conditioned environment",
];

export default function ConferenceSection() {
  return (
    <section className="bg-white dark:bg-gray-100 w-full py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="relative w-full h-72 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/hotel/conference.jpg" // Replace with your actual image path
            alt="Conference Room"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        {/* Content Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-500 mb-4">
            Host Memorable Conferences & Events
          </h2>
          <p className="text-gray-600 dark:text-ray-400 mb-6">
            Our modern conference facilities are perfect for business meetings, workshops, and corporate gatherings.
            Customize your event with our dedicated support team and flexible packages.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((item, index) => (
              <div key={index} className="flex items-center text-gray-700 dark:text-ray-400 text-sm">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}