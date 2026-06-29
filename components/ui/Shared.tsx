import React, { useEffect, useRef, useState } from 'react';
import logo from '../ui/DeepFlowlogo.png';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '', id }) => (
  <div id={id} className={`max-w-7xl mx-auto px-6 md:px-8 ${className}`}>
    {children}
  </div>
);

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id }) => (
  <section id={id} className={`py-24 md:py-32 relative scroll-mt-24 ${className}`} style={{ overflowX: 'clip' }}>
    {children}
  </section>
);

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = domRef.current;
    if (!current) return;

    // If already in the viewport on mount, make visible immediately
    const rect = current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    observer.observe(current);
    return () => observer.unobserve(current);
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'vibrant';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-sm font-bold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-accent-500/40 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transform hover:-translate-y-0.5";

  const variants = {
    primary: "text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30",
    vibrant: "text-white bg-gradient-to-r from-accent-500 to-blue-600 hover:from-accent-400 hover:to-blue-500 shadow-lg shadow-accent-500/20 hover:shadow-accent-500/35 border-none",
    secondary: "text-white bg-slate-800 border border-white/10 hover:border-white/20 hover:bg-slate-700",
    outline: "text-slate-300 bg-transparent border border-white/15 hover:border-white/30 hover:text-white",
    glass: "text-white bg-white/5 backdrop-blur-md border border-white/15 hover:bg-white/10 hover:border-white/25",
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const SectionHeading: React.FC<{
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
  accent?: boolean;
}> = ({ title, subtitle, center, dark = true, accent = true }) => (
  <div className={`mb-14 ${center ? 'text-center flex flex-col items-center' : ''}`}>
    <FadeIn>
      {accent && (
        <div className={`h-px w-14 bg-gradient-to-r from-accent-500 to-blue-500 mb-7 ${center ? 'mx-auto' : ''}`} />
      )}
      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-[1.1] ${
        dark ? 'text-white' : 'text-slate-900'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl max-w-2xl font-light leading-relaxed ${
          dark ? 'text-slate-400' : 'text-slate-600'
        } ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </FadeIn>
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
    <span className="flex h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse"></span>
    <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase">{children}</span>
  </div>
);

export const FeatureCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
}> = ({ icon: Icon, title, description }) => (
  <div className="bg-slate-900/60 p-7 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 h-full group hover:bg-slate-900">
    <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 text-slate-500 mb-5 group-hover:bg-accent-500 group-hover:text-white transition-all duration-300">
      <Icon size={20} />
    </div>
    <h3 className="text-base font-bold text-white mb-2.5">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </div>
);

export const Logo: React.FC<{ className?: string; darkText?: boolean }> = ({ className = "" }) => (
  <div className={`inline-flex items-center bg-white rounded-xl px-3 py-1.5 ${className}`}>
    <img
      src={logo}
      alt="DeepflowAI"
      className="h-11 w-auto object-contain"
      style={{ mixBlendMode: 'multiply' }}
      onError={() => {}}
    />
  </div>
);
