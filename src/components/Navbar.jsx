import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  let dropdownTimeout;

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout);
    setIsProjectsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => setIsProjectsDropdownOpen(false), 200); // Adjust delay as needed
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-800 mr-1">
                Sri Suhas
              </span>
              <span className="text-2xl font-light text-blue-600">
                Constructions
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                Home
              </Link>
              <div
                className="relative text-gray-600 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Projects
                <ChevronDown
                  className={`inline-block ml-1 transition-transform duration-300 ${
                    isProjectsDropdownOpen ? "transform rotate-180" : ""
                  }`}
                  size={18}
                />
                {isProjectsDropdownOpen && (
                  <div className="absolute bg-white shadow-md mt-2 rounded-md p-2 w-40">
                    <Link
                      to="/ongoing-projects"
                      className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      Ongoing Projects
                    </Link>
                    <Link
                      to="/completed-projects"
                      className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      Completed Projects
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/contact"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link
              to="/"
              className="block px
