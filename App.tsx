import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Problem, Solution } from './components/ProblemSolution';
import { Features } from './components/Features';
import { PricingCalculator } from './components/PricingCalculator';
import { Dashboard } from './components/Dashboard';
import { InteractiveDemo } from './components/InteractiveDemo';
import { Contact } from './components/Contact';
import { CustomWork } from './components/CustomWork';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { ContactPage } from './components/ContactPage';
import { ServicesPage } from './components/ServicesPage';
import { AboutPage } from './components/AboutPage';
import { PricingPage } from './components/PricingPage';
import { Container, Logo } from './components/ui/Shared';

type Page = 'home' | 'privacy' | 'terms' | 'contact' | 'services' | 'about' | 'pricing';

const footerLinkClass = "text-slate-500 hover:text-slate-200 transition-colors duration-200 text-sm";

const Footer: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
  <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-10">
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/5">

        {/* Brand column */}
        <div className="md:col-span-1">
          <Logo className="mb-5" />
          <p className="text-slate-500 text-sm leading-relaxed mt-4">
            The office manager for tradespeople. We write and chase your enquiries, quotes and
            invoices — you approve every message. Based in Northern Ireland.
          </p>
        </div>

        {/* Services */}
        <div>
          <p className="text-white font-semibold text-sm mb-5">What we do</p>
          <ul className="space-y-3">
            {['The £69 plan', 'Your AI PA', 'Custom work', 'Real example: D&M Joinery'].map(label => (
              <li key={label}>
                <button onClick={() => onNavigate('services')} className={footerLinkClass}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-white font-semibold text-sm mb-5">Company</p>
          <ul className="space-y-3">
            <li><button onClick={() => onNavigate('about')} className={footerLinkClass}>About</button></li>
            <li><button onClick={() => onNavigate('pricing')} className={footerLinkClass}>Pricing</button></li>
            <li><button onClick={() => onNavigate('contact')} className={footerLinkClass}>Contact</button></li>
          </ul>
        </div>

        {/* Start */}
        <div>
          <p className="text-white font-semibold text-sm mb-5">Start</p>
          <p className="text-slate-500 text-sm leading-relaxed mb-5">
            Tell us the job that eats your evenings. We'll show you how to get rid of it.
          </p>
          <a
            href="#assessment"
            className="text-accent-400 hover:text-accent-300 text-sm font-semibold transition-colors duration-200"
          >
            Tell us your problem →
          </a>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
        <p className="text-slate-700 text-sm">
          &copy; {new Date().getFullYear()} DeepflowAI. Built for the trade.
        </p>
        <div className="flex gap-6">
          <button onClick={() => onNavigate('privacy')} className={footerLinkClass}>Privacy</button>
          <button onClick={() => onNavigate('terms')} className={footerLinkClass}>Terms</button>
          <button onClick={() => onNavigate('contact')} className={footerLinkClass}>Contact</button>
        </div>
      </div>

    </Container>
  </footer>
);

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Links from sub-pages go to "/#assessment" (a full page load). The sections
  // only exist once React has rendered, so the browser can't jump there by
  // itself — scroll once after the first render.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150);
    return () => clearTimeout(t);
  }, []);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
      <Navigation isSubPage={currentPage !== 'home'} onNavigateHome={() => navigateTo('home')} />
      {currentPage === 'home' ? (
        <main>
          <Hero />
          <Problem />
          <Solution />
          <Features />
          <InteractiveDemo />
          <Dashboard />
          <CustomWork />
          <PricingCalculator onSeePricing={() => navigateTo('pricing')} />
          <Contact />
        </main>
      ) : currentPage === 'privacy' ? (
        <PrivacyPolicy />
      ) : currentPage === 'terms' ? (
        <TermsAndConditions />
      ) : currentPage === 'contact' ? (
        <ContactPage />
      ) : currentPage === 'services' ? (
        <ServicesPage />
      ) : currentPage === 'about' ? (
        <AboutPage />
      ) : currentPage === 'pricing' ? (
        <PricingPage />
      ) : (
        <ContactPage />
      )}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;
