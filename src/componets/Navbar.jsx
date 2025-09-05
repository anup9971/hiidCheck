"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDropdown, setLoginDropdown] = useState(false);
  const [role, setRole] = useState(null); // role state
  const dropdownRef = useRef(null);

  // Load login and role from localStorage
  useEffect(() => {
    const login = localStorage.getItem("login");
    const storedRole = localStorage.getItem("role");
    if (login) setIsLoggedIn(true);
    if (storedRole) setRole(storedRole);
  }, []);
console.log(role=="Owner");

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLoginDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    setLoginDropdown(false);
    setMobileOpen(false);
    router.push("/");
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
                {isLoggedIn
                  ? `Hi, ${localStorage.getItem("name")}`
                  : "Login/Signup"}
              </button>

              {loginDropdown && (
                <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                  {!isLoggedIn ? (
                    <>
                      <li>
                        <Link
                          href="/userlogin"
                          onClick={() => setLoginDropdown(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
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
                      {/* User Links */}
                      {role == "User" && (
                        <>
                          <li>
                            <Link
                              href="/user-booking"
                              onClick={() => setLoginDropdown(false)}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              My Booking
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/user-offers"
                              onClick={() => setLoginDropdown(false)}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Offers
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/user-profile"
                              onClick={() => setLoginDropdown(false)}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Profile
                            </Link>
                          </li>
                        </>
                      )}

                      {/* Owner Links */}
                      {role == "Owner" && (
                        <>
                          <li>
                            <Link
                              href="/owner-all-property"
                              onClick={() => setLoginDropdown(false)}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              All Properties
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/owner-add-property"
                              onClick={() => setLoginDropdown(false)}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Add New Property
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/owner-all-booking"
                              onClick={() => setLoginDropdown(false)}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Booking
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/owner-profile"
                              onClick={() => setLoginDropdown(false)}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                             Profile
                            </Link>
                          </li>
                        </>
                      )}

                      {/* Admin Links */}
                      {role == "Admin" && (
                        <>
                          <li>
                            <Link
                              href="/admin/dashboard"
                              onClick={() => setLoginDropdown(false)}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Admin Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/users"
                              onClick={() => setLoginDropdown(false)}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Manage Users
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/reports"
                              onClick={() => setLoginDropdown(false)}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Reports
                            </Link>
                          </li>
                        </>
                      )}

                      {/* Logout */}
                      <li>
                        <button
                          onClick={handleLogout}
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
        <div className="md:hidden bg-white shadow-md px-4 pb-4 pt-2 space-y-3">
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
              <div className="flex flex-col gap-2">
                {/* User Links */}
                {role == "User" && (
                  <>
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
                      Profile
                    </Link>
                  </>
                )}

                {/* Owner Links */}
                {role == "Owner" && (
                  <>
                    <Link
                      href="/owner/properties"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-2 text-black hover:bg-gray-100 rounded"
                    >
                      My Properties
                    </Link>
                    <Link
                      href="/owner/add-property"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-2 text-black hover:bg-gray-100 rounded"
                    >
                      Add Property
                    </Link>
                    <Link
                      href="/owner/profile"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-2 text-black hover:bg-gray-100 rounded"
                    >
                      Owner Profile
                    </Link>
                  </>
                )}

                {/* Admin Links */}
                {role == "Admin" && (
                  <>
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-2 text-black hover:bg-gray-100 rounded"
                    >
                      Admin Dashboard
                    </Link>
                    <Link
                      href="/admin/users"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-2 text-black hover:bg-gray-100 rounded"
                    >
                      Manage Users
                    </Link>
                    <Link
                      href="/admin/reports"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-2 text-black hover:bg-gray-100 rounded"
                    >
                      Reports
                    </Link>
                  </>
                )}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  
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
