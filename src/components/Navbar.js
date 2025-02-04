'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const MENU_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Guides', path: '/guides' },
  { name: 'Resources', path: '/resources' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const handleScroll = useCallback(() => {
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
  }, [isHome]);

  useEffect(() => {
    const throttledScroll = () => {
      let ticking = false;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen 
          ? 'bg-white shadow-md' 
          : 'bg-gradient-to-b from-black/50 to-black/0'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className={`font-bold text-xl transition-colors ${
              isScrolled || !isHome ? 'text-blue-600' : 'text-white'
            }`}
            aria-label="PassiveIncomeToday Home"
          >
            PassiveIncomeToday
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`hover:text-blue-600 transition-colors relative group ${
                  isScrolled || !isHome ? 'text-gray-700' : 'text-white'
                } ${pathname === item.path ? 'font-semibold' : ''}`}
                aria-current={pathname === item.path ? 'page' : undefined}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full ${
                  pathname === item.path ? 'w-full' : ''
                }`} />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors ${
              isScrolled || !isHome ? 'text-gray-700' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
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
        <div 
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-48 opacity-100' 
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            {MENU_ITEMS.map((item) => (
              <Link 
                key={item.name}
                href={item.path}
                className={`block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors ${
                  pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
                }`}
                aria-current={pathname === item.path ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
