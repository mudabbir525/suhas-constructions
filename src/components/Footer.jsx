import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Sri Suhas Constructions</h3>
            <p className="text-gray-400 mb-4">Building dreams into reality with excellence and integrity since [Year].</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="/ongoing-projects" className="text-gray-400 hover:text-white transition-colors duration-300">Projects</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin size={20} />
                <span>Plot No.3, Road No.2, Andhrakeshari Nagar, Vanasthalipuram, Hyd-500 070</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={20} />
                <span>+91 83339 36688</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={20} />
                <span>srisuhasconstructions@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sri Suhas Constructions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
