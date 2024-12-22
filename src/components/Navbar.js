'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Only apply transparency on home page
      if (!isHome) {
        setIsScrolled(true);
        return;
      }
      
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const scrollPosition = window.scrollY;
        const heroBottom = heroSection.offsetTop + (heroSection.offsetHeight * 0.8);
        setIsScrolled(scrollPosition > heroBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || isMenuOpen 
        ? 'bg-white shadow-md' 
        : 'bg-gradient-to-b from-black/50 to-black/0'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className={`font-bold text-xl ${
            isScrolled || !isHome ? 'text-blue-600' : 'text-white'
          }`}>
            PassiveIncomeToday
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['Home', 'ROI Calculator', 'Guides', 'Tools'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                className={`hover:text-blue-600 transition-colors ${
                  isScrolled || !isHome ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden ${isScrolled || !isHome ? 'text-gray-700' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/tools/rental-property-roi" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              ROI Calculator
            </Link>
            <Link 
              href="/guides" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Guides
            </Link>
            <Link 
              href="/tools" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Tools
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
