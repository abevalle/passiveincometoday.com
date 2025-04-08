'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';

const BASE_MENU_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Guides', path: '/guides' },
  { name: 'Resources', path: '/resources' },
];

// Sweepstakes item with end date
const SWEEPSTAKES_ITEM = { 
  name: '$150 Sweepstakes', 
  path: 'https://freemoney.passiveincometoday.com', 
  isExternal: true,
  expiresOn: new Date('April 30, 2025')
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Generate menu items based on current date
  const MENU_ITEMS = useMemo(() => {
    const now = new Date();
    const showSweepstakes = now < SWEEPSTAKES_ITEM.expiresOn;
    
    return showSweepstakes 
      ? [...BASE_MENU_ITEMS, SWEEPSTAKES_ITEM]
      : BASE_MENU_ITEMS;
  }, []);

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
          ? 'bg-white dark:bg-[rgb(28,28,30)] shadow-md dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]' 
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
              isScrolled || !isHome 
                ? 'text-[rgb(0,122,255)] dark:text-[rgb(10,132,255)]' 
                : 'text-white'
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
                className={`hover:text-[rgb(0,122,255)] dark:hover:text-[rgb(10,132,255)] transition-colors relative group ${
                  isScrolled || !isHome 
                    ? 'text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)]' 
                    : 'text-white'
                } ${pathname === item.path ? 'font-semibold' : ''}`}
                aria-current={pathname === item.path ? 'page' : undefined}
                {...(item.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {item.name}
                {item.isExternal && (
                  <span className="ml-1 inline-block">
                    <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                )}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[rgb(0,122,255)] dark:bg-[rgb(10,132,255)] transition-all group-hover:w-full ${
                  pathname === item.path ? 'w-full' : ''
                }`} />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 rounded-lg hover:bg-[rgb(242,242,247)] dark:hover:bg-[rgb(44,44,46)] transition-colors ${
              isScrolled || !isHome 
                ? 'text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)]' 
                : 'text-white'
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
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-[rgb(28,28,30)]">
            {MENU_ITEMS.map((item) => (
              <Link 
                key={item.name}
                href={item.path}
                className={`block px-3 py-2 rounded-md text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] hover:text-[rgb(0,122,255)] dark:hover:text-[rgb(10,132,255)] hover:bg-[rgb(242,242,247)] dark:hover:bg-[rgb(44,44,46)] transition-colors ${
                  pathname === item.path 
                    ? 'bg-[rgb(242,242,247)] dark:bg-[rgb(44,44,46)] text-[rgb(0,122,255)] dark:text-[rgb(10,132,255)]' 
                    : ''
                }`}
                aria-current={pathname === item.path ? 'page' : undefined}
                {...(item.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {item.name}
                {item.isExternal && (
                  <span className="ml-1 inline-block text-xs">
                    <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
