import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#5f8575] text-gray-800 mt-0">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1: Brand */}
        <div>
          <h2 className="text-xl mt-[-50px] font-bold text-white">
              <Link href="/" className="text-xl font-bold text-gray-100">
           <Image 
              src="/logo_hid.png" 
              alt="Hotel In Delhi Logo"
              width={150}
              height={50}
              priority
            />
            
          </Link>
          </h2>
          <p className="mt-2 text-sm text-gray-100">
           Big things are coming, right where Delhi does business best — stay tuned.
          </p>
        </div>

        {/* Column 2: Company */}
        <div>
          <h3 className="text-md font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="text-white hover:text-gray-300 hover:border-b-1">About Us</Link></li>
            <li><Link href="#" className="text-white hover:text-gray-300 hover:border-b-1">Careers</Link></li>
            <li><Link href="#" className="text-white hover:text-gray-300 hover:border-b-1">Press</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h3 className="text-md font-semibold  text-white mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="text-white hover:text-gray-300 hover:border-b-1">Booking</Link></li>
            <li><Link href="#" className="text-white hover:text-gray-300 hover:border-b-1">Corporate Law</Link></li>
            <li><Link href="#" className="text-white hover:text-gray-300 hover:border-b-1">Family Law</Link></li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div>
          <h3 className="text-md font-semibold text-white mb-3">Help & Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="text-white hover:text-gray-300 hover:border-b-1">FAQs</Link></li>
            <li><Link href="#" className="text-white hover:text-gray-300 hover:border-b-1">Customer Support</Link></li>
            <li><Link href="#" className="text-white hover:text-gray-300 hover:border-b-1">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-100">
        © {new Date().getFullYear()} Hotel In Delhi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
