"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Mail, Phone, MapPin } from "lucide-react";

const cards = [
  {
    id: 1,
    title: "Corporate Excellence",
    subtitle: "Driving Growth & Innovation",
    description:
      "We provide end-to-end corporate solutions tailored to enhance productivity and growth.",
    points: [
      "Customized strategies for each business",
      "Expert guidance with measurable outcomes",
      "Sustainable growth through innovation",
    ],
    img: "/hotel/conference.jpg",
  },
  {
    id: 2,
    title: "Innovative Strategies",
    subtitle: "Future-Ready Solutions",
    description:
      "Our innovative strategies help organizations achieve sustainable success.",
    points: [
      "Market research & competitive analysis",
      "Digital transformation roadmaps",
      "Agile methodology implementation",
    ],
    img: "/hotel/corporate.jpg",
  },
  {
    id: 3,
    title: "Trusted Partnerships",
    subtitle: "Collaboration That Lasts",
    description:
      "Building long-term partnerships with integrity, trust, and excellence.",
    points: [
      "Dedicated relationship managers",
      "Transparent communication",
      "Global industry collaborations",
    ],
    img: "/hotel/hotel1.jpg",
  },
  {
    id: 4,
    title: "Global Network",
    subtitle: "Connecting Opportunities Worldwide",
    description:
      "Our corporate network spans across industries and geographies worldwide.",
    points: [
      "Presence in 20+ countries",
      "Access to international markets",
      "Cross-border business solutions",
    ],
    img: "/hotel/hotel2.jpg",
  },
];

export default function CorporateSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + cards.length) % cards.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % cards.length);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      

      {/* Hero */}
      <section className="flex-1 bg-gray-100 py-20 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Empowering Businesses with Excellence
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6">
          We help corporates achieve success through innovative solutions,
          strategic insights, and a global approach to business challenges.
        </p>
        <button className="bg-[#5f8575] text-white px-6 py-3 rounded-lg hover:bg-[#4e6b60] transition">
          Get Started
        </button>
      </section>

      {/* About */}
      <section id="about" className="bg-white py-16 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-semibold mb-4 text-[#5f8575]">About Us</h3>
          <p className="text-gray-700 text-lg">
            With over a decade of experience, we specialize in providing
            customized corporate solutions for businesses worldwide. Our team of
            experts delivers strategic insights and practical tools that help
            organizations scale effectively.
          </p>
        </div>
      </section>

      {/* Card Slider */}
      <section id="services" className="bg-gray-50 py-16 relative">
        <div className="container mx-auto text-center mb-10 px-4">
          <h3 className="text-3xl font-semibold mb-4 text-[#5f8575]">Our Corporate Values</h3>
          <p className="text-gray-600">
            Discover how we create value for our partners worldwide.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * (100 / 3)}%)`,
              width: `${cards.length * (100 / 3)}%`,
            }}
          >
            {cards.map((card) => (
              <div key={card.id} className="w-full md:w-1/3 flex-shrink-0 px-4">
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden h-full flex flex-col">
                  <img src={card.img} alt={card.title} className="w-full h-48 object-cover" />
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-2xl font-bold mb-1">{card.title}</h4>
                    <span className="text-[#5f8575] font-medium mb-3">{card.subtitle}</span>
                    <p className="text-gray-600 mb-4">{card.description}</p>
                    <ul className="text-gray-700 mb-4 list-disc list-inside text-left">
                      {card.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <button className="bg-[#5f8575] text-white px-4 py-2 rounded-lg hover:bg-[#4e6b60] transition">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 md:-left-10 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 md:-right-10 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why" className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-10 text-[#5f8575]">Why Choose Us?</h3>
          <div className="grid md:grid-cols-4 gap-8 text-left">
            {[
              { title: "Expert Team", desc: "Highly skilled professionals with years of experience." },
              { title: "Global Reach", desc: "We operate across multiple countries and industries." },
              { title: "Innovation", desc: "Cutting-edge strategies for modern businesses." },
              { title: "Customer Focus", desc: "Dedicated to client success and satisfaction." },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
                <h4 className="text-xl font-bold mb-2 text-[#5f8575]">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-10 text-[#5f8575]">What Our Clients Say</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "John Doe", review: "Their corporate strategies helped us scale rapidly and achieve great results." },
              { name: "Sarah Smith", review: "Professional team, excellent communication, and innovative solutions." },
              { name: "Michael Brown", review: "A trusted partner for our business expansion globally." },
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                <p className="text-gray-700 mb-4">“{t.review}”</p>
                <h5 className="font-bold text-[#5f8575]">{t.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-8 text-[#5f8575]">Get in Touch</h3>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <p className="mb-4">We’d love to hear from you! Reach out to us for business inquiries or collaborations.</p>
              <p className="flex items-center mb-2"><MapPin className="mr-2 text-[#5f8575]"/> New Delhi, India</p>
              <p className="flex items-center mb-2"><Phone className="mr-2 text-[#5f8575]"/> +91 9876543210</p>
              <p className="flex items-center"><Mail className="mr-2 text-[#5f8575]"/> info@corporatesolutions.com</p>
            </div>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full border p-3 rounded-lg" />
              <input type="email" placeholder="Your Email" className="w-full border p-3 rounded-lg" />
              <textarea placeholder="Your Message" rows="4" className="w-full border p-3 rounded-lg"></textarea>
              <button className="bg-[#5f8575] text-white px-6 py-3 rounded-lg hover:bg-[#4e6b60] transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}
