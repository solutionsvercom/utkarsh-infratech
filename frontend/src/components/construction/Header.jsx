import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About Us', 'Services', 'Projects', 'Testimonials', 'Contact'];

  const scrollToSection = (item) => {
    const sectionId = item.toLowerCase().replace(' ', '-');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <div>
              <h1 className={`font-bold text-lg tracking-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                UTKARSH INFRATECH
              </h1>
              <p className={`text-xs tracking-widest uppercase ${isScrolled ? 'text-orange-500' : 'text-orange-400'}`}>
                Builder & Contractor
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className={`gap-2 ${isScrolled ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white' : 'border-white text-white hover:bg-white hover:text-gray-900'}`}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
            <Button 
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="px-6 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                >
                  {item}
                </button>
              ))}
              <div className="px-6 py-4 flex flex-col gap-2 border-t mt-2">
                <Button variant="outline" className="w-full gap-2 border-gray-900">
                  <Phone className="w-4 h-4" />
                  Call Now
                </Button>
                {/* <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Get a Quote
                </Button> */}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}