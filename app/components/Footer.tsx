'use client';

import { Leaf, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">PlantID</span>
            </div>
            <p className="text-gray-600 mb-6 text-lg">
              Discover and learn about plants using advanced AI technology. Get detailed information about any plant with just a photo.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-green-600">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 uppercase mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="/" className="text-lg font-semibold text-gray-600 hover:text-green-600">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-lg font-semibold text-gray-600 hover:text-green-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-lg font-semibold text-gray-600 hover:text-green-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 uppercase mb-6">Contact</h3>
            <ul className="space-y-4 text-lg">
              <li className="text-gray-600">Email: info@plantid.com</li>
              <li className="text-gray-600">Phone: (555) 123-4567</li>
              <li className="text-gray-600">Address: 123 Plant Street</li>
              <li className="text-gray-600">City, State 12345</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-lg">
            © {new Date().getFullYear()} PlantID. All rights reserved. Powered by Next.js and Google's Gemini AI
          </p>
        </div>
      </div>
    </footer>
  );
} 