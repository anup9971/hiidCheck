"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDropdown, setLoginDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login) setIsLoggedIn(true);
  }, []);

  // Outside click pe dropdown close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setLoginDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <div className="hidden md:flex space-x-8 items-center relative">
            <Link
              href="/corporate"
              className="text-white hover:text-gray-300 hover:border-b-1"
            >
              Corporate
            </Link>
            <Link
              href="https://hotelinkarolbagh.com/"
              className="text-white hover:text-gray-300 hover:border-b-1"
            >
              Booking
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-gray-300 hover:border-b-1"
            >
              Contact
            </Link>

            {/* Login / Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLoginDropdown(!loginDropdown)}
                className="flex items-center border p-2 rounded gap-2 text-white hover:text-gray-200"
              >
                <FaRegCircleUser className="text-xl" />
                {isLoggedIn ? `Hi, ${localStorage.getItem("name")}` : "Login/Signup"}
              </button>

              {loginDropdown && (
                <ul className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
                  {!isLoggedIn ? (
                    <>
                      <li>
                        <Link
                          href="/login"
                          onClick={() => setLoginDropdown(false)}
                          className="block px-4   py-2 hover:bg-gray-100"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/register"
                          onClick={() => setLoginDropdown(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/mybooking"
                          onClick={() => setLoginDropdown(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          My Booking
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/offer"
                          onClick={() => setLoginDropdown(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Offers
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/profile"
                          onClick={() => setLoginDropdown(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            localStorage.removeItem("login");
                            setIsLoggedIn(false);
                            setLoginDropdown(false);
                          }}
                          className="flex gap-1 text-left px-4 py-2 bg-red-500 rounded-2xl m-auto mb-2 mt-1 w-[110px] text-white hover:bg-red-700"
                        >
                          <RiLogoutCircleRLine className="text-xl" />
                          Logout
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden  bg-white shadow-md px-4 pb-4 pt-2 space-y-3">
          <Link
            href="/corporate"
            onClick={() => setMobileOpen(false)}
            className="block text-black hover:text-gray-300 hover:border-b-1"
          >
            Corporate
          </Link>
          <Link
            href="https://hotelinkarolbagh.com/"
            onClick={() => setMobileOpen(false)}
            className="block text-black hover:text-gray-300 hover:border-b-1"
          >
            Booking
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block text-black hover:text-gray-300 hover:border-b-1"
          >
            Contact
          </Link>

          {/* Mobile Login Dropdown */}
          <div>
  {!isLoggedIn ? (
    <div className="flex gap-3">
      <Link
        href="/login"
        onClick={() => setMobileOpen(false)}
        className="px-4 py-2 bg-[#5f8575] text-white rounded hover:bg-[#477562]"
      >
        Login
      </Link>
      <Link
        href="/register"
        onClick={() => setMobileOpen(false)}
        className="px-4 py-2 bg-[#5f8575] text-white rounded hover:bg-[#477562]"
      >
        Register
      </Link>
    </div>
  ) : (
    <div className="flex gap-3 items-center flex-wrap">
      <Link
        href="/mybooking"
        onClick={() => setMobileOpen(false)}
        className="px-4 py-2 text-black hover:bg-gray-100 rounded"
      >
        My Booking
      </Link>
      <Link
        href="/offer"
        onClick={() => setMobileOpen(false)}
        className="px-4 py-2 text-black hover:bg-gray-100 rounded"
      >
        Offers
      </Link>
      <Link
        href="/profile"
        onClick={() => setMobileOpen(false)}
        className="px-4 py-2 text-black hover:bg-gray-100 rounded"
      >
        View Profile
      </Link>
      <button
        onClick={() => {
          localStorage.removeItem("login");
          setIsLoggedIn(false);
          setMobileOpen(false);
        }}
        className="flex items-center gap-1 px-4 py-2 bg-red-500 rounded-2xl text-white hover:bg-red-700"
      >
        <RiLogoutCircleRLine className="text-xl" />
        Logout
      </button>
    </div>
  )}
</div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
