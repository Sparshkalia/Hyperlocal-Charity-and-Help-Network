"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-lg shadow-lg border-b border-white/30">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div
          className=" text-black text-2xl font-bold cursor-pointer hover:scale-105 transition"
          onClick={() => router.push("/")}
        >
          🏥 H-C-H-N
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li className="text-black hover:text-purple-600 transition">
            <a href="/">Home</a>
          </li>
          <li className="text-black hover:text-purple-600  transition">
            <a href="/services">Services</a>
          </li>
          <li className="text-black hover:text-purple-600  transition">
            <a href="/about">About</a>
          </li>
          <li className="text-black hover:text-purple-600  transition">
            <a href="/contact">Contact</a>
          </li>
        </ul>

        {/* Sign Up Button */}
        <button
          onClick={handleSignup}
          className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-transform hover:scale-105"
        >
          Sign Up
        </button>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-0 left-0 w-full h-screen bg-black/80 backdrop-blur-lg flex flex-col items-center justify-center space-y-6 text-white text-xl transition-all ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <a href="/" className="text-black hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="/services" className="text-black hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="/about" className="text-black hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>About</a>
        <a href="/contact" className="text-black hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>Contact</a>
        <button
          onClick={handleSignup}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-transform hover:scale-105"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
