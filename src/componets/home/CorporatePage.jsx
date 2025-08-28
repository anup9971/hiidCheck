import { LucideBriefcaseBusiness } from "lucide-react";
import { IoBusinessSharp } from "react-icons/io5";
import { MdOutlineCall } from "react-icons/md";


export default function CorporatePage() {
  return (
    <main className="text-gray-800">
      {/* Hero */}
      <section className="bg-[url('/hotel/corporate.jpg')] bg-cover bg-center  text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl text-gray-800 font-bold mb-4">Corporate Bookings</h1>
        <p className="text-lg md:text-xl  text-gray-600  max-w-3xl mx-auto">Elevate your corporate stays with our premium hospitality and business-friendly services.</p>
        <button className="mt-6 bg-white border text-black px-6 py-3 rounded-md hover:text-white hover:bg-gray-900 transition">Book Now</button>
      </section>

      {/* About */}
      <section className="py-16 px-4 max-w-6xl md:bg-white bg-gray-100 mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Why Choose Us</h2>
        <p className="text-lg text-gray-600">Our hotel provides tailored solutions for corporate clients. Whether you're organizing a conference, booking long-term stays for executives, or hosting a networking event — we’ve got you covered.</p>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-cover bg-centern bg-gray-600 bg-[url(/hotel/service.jpg)]" >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center">Our Corporate Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Business Stays",
                desc: "Exclusive packages for extended corporate stays with workspace and high-speed Wi-Fi.",
                icon: <LucideBriefcaseBusiness />,
              },
              {
                title: "Meeting & Event Rooms",
                desc: "Modern conference halls with full A/V setup for your business events.",
                icon: <IoBusinessSharp />,
              },
              {
                title: "Priority Support",
                desc: "24x7 concierge and custom billing services for companies.",
                icon: <MdOutlineCall />,
              },
            ].map((service, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 max-w-6xl mx-auto md:bg-white bg-gray-100">
        <h2 className="text-3xl font-semibold mb-10 text-center">What Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <blockquote className="p-6 bg-gray-50 rounded-lg shadow">
            “Our team stays here every quarter. Excellent service and clean rooms with business amenities.”
            <footer className="mt-4 text-sm text-gray-500">— Rajiv S., TechCorp</footer>
          </blockquote>
          <blockquote className="p-6 bg-gray-50 rounded-lg shadow">
            “Hosting our annual seminar was seamless thanks to their top-notch event hall and support staff.”
            <footer className="mt-4 text-sm text-gray-500">— Meera P., EduCon</footer>
          </blockquote>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Partner With Us?</h2>
        <p className="mb-6 text-gray-300">Connect with our corporate team for exclusive deals and long-term plans.</p>
        <a href="/contact" className="bg-white  text-black  border-white border md:text-white  px-6 py-3 rounded-md hover:bg-gray-200 transition">
        <span className="hover:text-gray-500 text-black transition">Contact Us</span>
        
        </a>
      </section>
    </main>
  );
}





