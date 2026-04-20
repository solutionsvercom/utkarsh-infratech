import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { buttonVariants } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { PHONE_TEL_HREF } from '@/lib/contact';
import { BrandLogoMark } from '@/components/LogoText';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionNavItems = ['Home', 'About Us', 'Services', 'Projects', 'Packages', 'Testimonials', 'Contact'];
  const isHome = location.pathname === '/';

  const scrollToSection = (item) => {
    const sectionId = item.toLowerCase().replace(/\s+/g, '-');
    const scrollToTarget = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (!isHome) {
      navigate('/');
      setTimeout(scrollToTarget, 80);
    } else {
      scrollToTarget();
    }

    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0 shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden ring-2 ring-orange-500/80 shrink-0 bg-white">
              <BrandLogoMark />
            </div>
            <div className="min-w-0">
              <h1 className={`font-bold text-base sm:text-lg tracking-tight truncate ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                UTKARSH INFRATECH
              </h1>
              <p className={`text-[10px] sm:text-xs tracking-widest uppercase ${isScrolled ? 'text-orange-500' : 'text-orange-400'}`}>
                Builder &amp; Contractor
              </p>
            </div>
          </div>

          {/* Desktop Navigation — centered between brand and CTA */}
          <nav
            className="hidden lg:flex flex-1 justify-center items-center gap-x-3 xl:gap-x-6 min-w-0 px-2"
            aria-label="Primary"
          >
            {sectionNavItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => scrollToSection(item)}
                className={cn(
                  'text-sm font-medium whitespace-nowrap transition-colors hover:text-orange-500 shrink-0',
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                )}
              >
                {item}
              </button>
            ))}
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium whitespace-nowrap transition-colors shrink-0',
                  isActive
                    ? 'text-orange-500'
                    : isScrolled
                      ? 'text-gray-700 hover:text-orange-500'
                      : 'text-white/90 hover:text-orange-500'
                )
              }
            >
              Portfolio
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={PHONE_TEL_HREF}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'lg:hidden flex-shrink-0 gap-1.5 px-2.5 sm:px-3',
                isScrolled
                  ? 'border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:text-white'
                  : 'border-white bg-white/15 text-white backdrop-blur-sm hover:bg-white hover:text-gray-900'
              )}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-semibold">Call</span>
            </a>

            <div className="hidden lg:flex items-center">
              <a
                href={PHONE_TEL_HREF}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'gap-2',
                  isScrolled
                    ? 'border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white'
                    : 'border-white bg-white/15 text-white backdrop-blur-sm hover:bg-white hover:text-gray-900'
                )}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            <button
              type="button"
              className="lg:hidden p-2 flex-shrink-0 -mr-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t">
            <nav className="flex flex-col py-2" aria-label="Mobile">
              {sectionNavItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => scrollToSection(item)}
                  className="px-6 py-3 text-left text-sm text-gray-800 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  {item}
                </button>
              ))}
              <NavLink
                to="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'px-6 py-3 text-left text-sm transition-colors',
                    isActive ? 'text-orange-600 bg-orange-50' : 'text-gray-800 hover:bg-orange-50 hover:text-orange-600'
                  )
                }
              >
                Portfolio
              </NavLink>
              <div className="px-6 py-4 flex flex-col gap-2 border-t mt-1">
                <a
                  href={PHONE_TEL_HREF}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-full gap-2 border-gray-900 bg-orange-500 text-white hover:bg-orange-600 hover:text-white'
                  )}
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
