import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-blue-400 text-white sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Sport<span className="text-blue-300">News</span>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 font-medium">
          <a href="/home" className="hover:text-blue-900 transition">
            Home
          </a>

          <a href="/articles" className="hover:text-blue-900 transition">
            Articles
          </a>
        </nav>

        {/* Optional Right Buttons */}
        <div className="hidden md:flex gap-3">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm">
            Subscribe
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-800 px-4 py-4 space-y-3">
          <a href="#" className="block hover:text-blue-300">
            Home
          </a>
          <a href="#" className="block hover:text-blue-300">
            Categories
          </a>
          <a href="#" className="block hover:text-blue-300">
            Articles
          </a>
          <button className="w-full mt-2  bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm">
            Subscribe
          </button>
        </div>
      )}
    </header>
  );
}
