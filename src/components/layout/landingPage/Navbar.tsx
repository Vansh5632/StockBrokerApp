'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession() as { data: Session | null };
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 px-4 sm:px-8 py-4
      ${isScrolled 
        ? 'bg-primary/95 backdrop-blur-xl shadow-lg shadow-secondary/5' 
        : 'bg-primary/80 backdrop-blur-md'}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-secondary to-accent overflow-hidden flex items-center justify-center">
            <span className="text-white font-bold text-xl">V</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
          <div className="text-xl font-bold">
            <span className="text-accent">V</span>
            <span className="text-white">broker</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            <a 
              href="#features" 
              className="relative text-sm font-medium text-gray-200 hover:text-accent transition-colors duration-300 group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#testimonials" 
              className="relative text-sm font-medium text-gray-200 hover:text-accent transition-colors duration-300 group"
            >
              Testimonials
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#contact" 
              className="relative text-sm font-medium text-gray-200 hover:text-accent transition-colors duration-300 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          {/* Authentication */}
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-1 px-3">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white text-xs">
                    {session.user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm text-white/80 truncate max-w-[100px]">
                    {session.user?.name || 'User'}
                  </span>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-full text-sm bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary hover:text-white transition-all duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => signIn('google')}
                  className="px-4 py-2 rounded-full text-sm border border-white/10 hover:bg-white/5 text-white transition-all duration-300"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => signIn('google')}
                  className="px-4 py-2 rounded-full text-sm bg-secondary text-white hover:bg-secondary/90 transition-all duration-300"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden relative z-50 text-white w-10 h-10 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Toggle menu</span>
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
            <span 
              className={`block h-0.5 w-6 rounded-sm bg-current transform transition duration-300 ease-in-out ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
              }`}
            ></span>
            <span 
              className={`block h-0.5 w-6 rounded-sm bg-current transition duration-300 ease-in-out my-0.5 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span 
              className={`block h-0.5 w-6 rounded-sm bg-current transform transition duration-300 ease-in-out ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 bg-primary/95 backdrop-blur-xl z-40 transition-all duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <a 
            href="#features" 
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-medium text-white hover:text-accent transition-all duration-300"
          >
            Features
          </a>
          <a 
            href="#testimonials" 
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-medium text-white hover:text-accent transition-all duration-300"
          >
            Testimonials
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-medium text-white hover:text-accent transition-all duration-300"
          >
            Contact
          </a>
          
          <div className="mt-8">
            {session ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-white">
                    {session.user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-white">{session.user?.name}</span>
                </div>
                <button 
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-secondary text-white hover:bg-secondary/80 transition-all duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 w-64">
                <button 
                  onClick={() => {
                    signIn('google');
                    setIsMenuOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-secondary text-white hover:bg-secondary/80 transition-all duration-300 w-full"
                >
                  Sign In with Google
                </button>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-white/10 text-white hover:bg-white/5 transition-all duration-300 w-full"
                >
                  Explore Platform
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}