import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { Logo, Button, Container } from './ui/Shared';

interface NavigationProps {
  isSubPage?: boolean;
  onNavigateHome?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isSubPage = false, onNavigateHome }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How it works', href: '#how-it-works' },
    { name: 'What you get', href: '#features' },
    { name: 'See it work', href: '#demo' },
    { name: 'Real example', href: '#custom' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}>
        <Container>
          <div className="flex items-center justify-between">

            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigateHome?.(); }}
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
            >
              <Logo />
            </a>

            {/* Centre nav / back link */}
            {isSubPage ? (
              <button
                onClick={onNavigateHome}
                className="hidden nav:flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft size={15} />
                Back to Home
              </button>
            ) : (
              <div className="hidden nav:flex items-center gap-7">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="relative text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200 group py-2 whitespace-nowrap"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-accent-400 transition-all duration-300 group-hover:w-full ease-out"></span>
                  </a>
                ))}
              </div>
            )}

            {/* CTA button */}
            <div className="hidden nav:block">
              {isSubPage ? (
                <Button
                  variant="vibrant"
                  className="px-6 py-2.5 text-sm h-auto rounded-full shadow-accent-500/20"
                  onClick={onNavigateHome}
                >
                  Get started
                </Button>
              ) : (
                <a href="#assessment">
                  <Button variant="vibrant" className="px-6 py-2.5 text-sm h-auto rounded-full shadow-accent-500/20">
                    Get started
                  </Button>
                </a>
              )}
            </div>

            {/* Hamburger — shown below 900px */}
            <button
              className="nav:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all active:scale-90"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </Container>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 nav:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none invisible'
        }`}
        style={{ backgroundColor: '#020617' }}
      >
        <div className="flex flex-col gap-8 h-full justify-center px-10">
          {isSubPage ? (
            <button
              onClick={() => { onNavigateHome?.(); setIsMobileMenuOpen(false); }}
              className="text-3xl font-bold text-white tracking-tight hover:text-accent-400 active:scale-95 flex items-center gap-3"
            >
              <ArrowLeft size={28} />
              Back to Home
            </button>
          ) : (
            navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-3xl font-bold text-white tracking-tight transition-all duration-500 hover:text-accent-400 active:scale-95 ${
                  isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                {link.name}
              </a>
            ))
          )}
          <div className="h-px bg-white/10 w-full" />
          <div className={`transition-all duration-500 ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`} style={{ transitionDelay: '240ms' }}>
            {isSubPage ? (
              <Button
                variant="vibrant"
                fullWidth
                className="text-lg py-4"
                onClick={() => { onNavigateHome?.(); setIsMobileMenuOpen(false); }}
              >
                Get started
              </Button>
            ) : (
              <a href="#assessment" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="vibrant" fullWidth className="text-lg py-4">
                  Get started
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
