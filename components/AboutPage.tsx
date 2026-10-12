import React from 'react';
import { Container } from './ui/Shared';

// Rewritten 11 Oct 2026 — plain English for tradespeople, not investors.

const Card: React.FC<{ title?: string; children: React.ReactNode; highlight?: boolean }> = ({ title, children, highlight }) => (
  <div className={`bg-slate-900/60 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 ${highlight ? 'border-accent-500/20 bg-accent-500/5' : ''}`}>
    {title && <h3 className="text-lg font-bold text-white mb-4">{title}</h3>}
    <div className={`leading-relaxed text-sm space-y-3 ${highlight ? 'text-slate-300' : 'text-slate-400'}`}>
      {children}
    </div>
  </div>
);

export const AboutPage: React.FC = () => (
  <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent-600/6 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

    <Container className="relative z-10">
      <div className="max-w-3xl">
        <div className="mb-16">
          <div className="h-px w-14 bg-gradient-to-r from-accent-500 to-blue-500 mb-8" />
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
            About DeepFlow
          </h1>
          <p className="text-xl text-slate-300 font-light mb-5 leading-relaxed">
            We're a small Northern Ireland company that does one thing: takes the paperwork off tradespeople.
          </p>
          <p className="text-slate-300 font-semibold leading-relaxed">
            Good tradespeople lose work, money and evenings to admin. That's the bit we fix.
          </p>
        </div>

        <div className="space-y-5">
          <Card title="Why we do it">
            <p>
              You're up a ladder when the enquiry comes in. You mean to chase the quote, but there's no time.
              The invoice goes out late and nobody chases it. Then the evening goes on catching up.
            </p>
            <p>
              None of that is about how good you are at your trade. It's just admin — and admin is exactly the
              kind of work a computer should be doing for you.
            </p>
          </Card>

          <Card title="How we work">
            <ul className="space-y-2.5">
              {[
                { value: 'You stay the boss', desc: 'nothing goes to a customer without your OK. Ever.' },
                { value: 'Plain English', desc: 'no jargon, no software to learn, no 40-page manual.' },
                { value: 'Honest numbers', desc: 'we only show you figures we can count from your own jobs. No made-up savings.' },
                { value: 'Your way, not ours', desc: 'we fit around how you already work, and fill in your own templates and spreadsheets.' },
                { value: 'Local', desc: 'based in Northern Ireland, and you deal with the person who built it.' },
              ].map(({ value, desc }) => (
                <li key={value} className="flex gap-2">
                  <span className="text-white font-bold shrink-0">{value}</span>
                  <span>— {desc}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card highlight>
            <p>
              Our first custom build was for D&M Fixing &amp; Joinery. It gives Robert about an hour and a half back
              every night. That's the whole idea: you do the work you're good at, and get home to the people
              you do it for.
            </p>
          </Card>
        </div>
      </div>
    </Container>
  </div>
);
