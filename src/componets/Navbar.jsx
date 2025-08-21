"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <nav className="bg-[#5f8575] shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
           <Link href="/" className="text-xl font-bold text-gray-100">
           <Image 
    src="/logo_hid.png" 
    alt="Hotel In Delhi Logo"
    width={150}
    height={70}
    priority
  />
            
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/corporate" className="text-white hover:text-gray-300 hover:border-b-1">
              Corporate
            </Link>
            <Link href="https://hotelinkarolbagh.com/" className="text-white hover:text-gray-300 hover:border-b-1">
              Booking
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300 hover:border-b-1">
              Contact 
            </Link>

            {/* Login Button */}
               <div  className="block w-full text-center px-4 py-2 bg-[#5f8575]  hover:bg-white hover:text-black  border-1  text-white rounded   ">
               <Link href="#"> Login</Link>
          </div>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 pt-2 space-y-3">
          <Link href="/corporate" className="block text-black hover:text-gray-300 hover:border-b-1">
            Corporate
          </Link>
          <Link href="https://hotelinkarolbagh.com/" className="block text-black hover:text-gray-300 hover:border-b-1">
            Booking
          </Link>
          <Link href="/contact" className="block text-black hover:text-gray-300 hover:border-b-1">
            Contact 
          </Link>

          
              <div  className="block w-22 text-center px-4 py-2 bg-[#5f8575] text-white rounded hover:bg-[#477562] ">
               <Link href="#"> Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
