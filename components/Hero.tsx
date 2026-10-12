import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Container, Button, FadeIn } from './ui/Shared';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center pt-28 pb-24 bg-slate-950" style={{ overflow: 'hidden' }}>

      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />

        {/* Cyan orb — top left */}
        <div className="absolute -top-60 -left-32 w-[800px] h-[800px] rounded-full bg-accent-500/10 blur-[140px]" />

        {/* Purple orb — right */}
        <div className="absolute top-1/2 -right-48 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />

        {/* Subtle bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl">

          {/* Badge */}
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_10px_rgba(34,211,238,0.9)] animate-pulse" />
              <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase">
                For tradespeople in Northern Ireland and across the UK
              </span>
            </div>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={80}>
            <h1 className="text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-tight leading-[1.04] mb-4">
              Get your evenings back.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-cyan-300 to-blue-400">
                We'll do the paperwork.
              </span>
            </h1>
          </FadeIn>

          {/* Sub-headline */}
          <FadeIn delay={160}>
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-5">
              Your own office manager — for £69 a month.
            </p>
          </FadeIn>

          {/* Paragraph */}
          <FadeIn delay={240}>
            <p className="text-base md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed font-light">
              Every enquiry gets a reply. Every quote gets chased. Every invoice gets sent and chased until it's paid. The messages are written for you — you just tap OK from the van.
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={280}>
            <div className="flex flex-col sm:flex-row gap-3 mb-14">
              <a href="#assessment">
                <Button
                  variant="vibrant"
                  className="h-14 px-10 text-base group w-full sm:w-auto shadow-[0_0_50px_rgba(6,182,212,0.18)]"
                >
                  Tell us what's eating your time
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#features">
                <Button variant="glass" className="h-14 px-10 text-base w-full sm:w-auto">
                  See what it does
                </Button>
              </a>
            </div>
          </FadeIn>

          {/* Trust bar */}
          <FadeIn delay={380}>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {[
                '£69 a month — cancel anytime',
                'Nothing goes out without your OK',
                'We set it all up for you',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                  <Check className="w-3.5 h-3.5 text-accent-500 flex-shrink-0" strokeWidth={2.5} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </Container>
    </div>
  );
};
