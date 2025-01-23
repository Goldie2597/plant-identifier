'use client';

import { Leaf, Home, Info, Mail } from 'lucide-react';
import Link from 'next/link';
import JasaLogo from './JasaLogo';

export default function Navigation() {
  return (
    <nav className="bg-green-600">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <JasaLogo />
            <span className="text-2xl font-bold text-white">PlantID</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-12">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-green-100 transition-colors">
              <Home className="w-5 h-5" />
              <span className="text-lg font-semibold">Home</span>
            </Link>
            <Link href="/about" className="flex items-center space-x-2 text-white hover:text-green-100 transition-colors">
              <Info className="w-5 h-5" />
              <span className="text-lg font-semibold">About Us</span>
            </Link>
            <Link href="/contact" className="flex items-center space-x-2 text-white hover:text-green-100 transition-colors">
              <Mail className="w-5 h-5" />
              <span className="text-lg font-semibold">Contact</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white hover:text-green-100 transition-colors">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 