

import Image from "next/image";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";


export default function ComingSoonPage() {

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      {/* <div className="relative w-full h-[80vh]">
        <Image
          src="/images/delhi-hotel.jpg"
          alt="Hotel in Delhi"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Hotel in Delhi – Coming Soon
          </h1>
          <p className="text-white text-lg max-w-2xl">
            Your new trusted booking partner for corporate & business travelers in Delhi NCR.
          </p>
        </div>
      </div> */}

      {/* Call to Action Section */}
      {/* <section className="px-4 py-12 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          Curious About Launch Perks?
        </h2>
        <p className="mb-6">
          Leave your details and unlock priority access before anyone else.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </section> */}

      {/* Human Touch Section */}
      <section className="bg-gray-50 px-4 py-12 text-center" style={{background:"url(/soonbg.jpg)", }}>
        <blockquote className="text-lg text-white md:text-xl max-w-3xl mx-auto italic">
          “As fellow business travelers, we know how stressful it is to find the right hotel solution in Delhi’s crowded market.
          We’re building this platform because your meetings matter—and your experience should be smoother. Let’s rethink corporate bookings together.”
        </blockquote>
      </section>

      {/* Trust Indicator Section */}
      <section className="px-4 py-12 text-center">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">Trusted by Leading Companies</h3>
        <p className="mb-4">With partnerships across Delhi’s most reliable hotels.</p>
        <div className="border rounded p-4 text-gray-500 italic">
          (Logo strip coming soon)
        </div>
      </section>

      {/* Contact Section */}
     


      <section className="bg-[#FFBFOO] py-16 px-4">
      <div className="max-w-7xl mx-auto  flex flex-col md:flex-row items-center gap-10">

 <div className="md:w-1/2 h-[300px]">
          <Image
            src="/contact.avif" 
            alt="Luxury experience"
            width={600}
            height={150}
            className="rounded object-cover w-full h-full "
          />
        </div>
       
            
      
        <div className="md:w-1/2 text-center md:text-left">
         <h3 className="text-xl md:text-2xl font-semibold mb-2">Contact Us</h3>
        <p className="mt-2 flex gap-2"><MdOutlineMail className="text-xl" />

          <a href="mailto:queryhiid@gmail.com" className="hover:text-[#5f8575] "> queryhiid@gmail.com</a>
        </p>
        <p className="mt-2 flex gap-2"><FaPhoneAlt className="text-xl"/>

          <a href="tel:+91 01169092435" className="hover:text-[#5f8575]">  011 6909 2435</a>
          </p>
        <p className="mt-2 flex gap-2 hover:text-[#5f8575]" ><IoLocationSharp className="text-xl" />
        Corporate Office, Pehlad Market, Karol Bagh, New Delhi </p>

        </div>
     
       
      </div>
    </section>
    </div>
  );
}
