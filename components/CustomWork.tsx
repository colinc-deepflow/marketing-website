import React from 'react';
import { ArrowRight, Check, MessageSquare, Camera, FileSearch, Wrench, Clock } from 'lucide-react';
import { Container, Section, SectionHeading, Button, FadeIn } from './ui/Shared';

// ============================================================================
// Custom work — priced per job, separate from the £69 plan.
// The case study is real: D&M Fixing & Joinery, October 2026 (see
// deepflow-automation-playbook.md in the project). Colin confirmed we can name
// them, and gave the figure: roughly 1.5 hours back per night.
// The main contractor and their portal are deliberately not named.
// ============================================================================

const BUILT = [
  'Job cards from the main contractor are picked up from email automatically — even when they arrive as a photo.',
  'His joiners see their own jobs on their phones and mark them done, with photos.',
  'Each price is worked out for him, with the call-out and mileage for that site added on.',
  'Invoices are made on his own invoice template, with reverse charge and CIS done right.',
  'The contractor\'s month-end spreadsheet is filled in for him, without breaking it.',
  'Everything is laid out ready to copy straight into the contractor\'s online portal.',
];

const STEPS = [
  { icon: MessageSquare, title: 'Tell us the job you hate', desc: 'In your own words. What you do, how often, and what drives you mad about it.' },
  { icon: Camera, title: 'Send us a photo of the paperwork', desc: 'The email, the job sheet, the invoice, the spreadsheet. Phone photos and screenshots are fine.' },
  { icon: FileSearch, title: 'We show you the fix', desc: 'In plain English: what it will do, what you\'ll still do yourself, and the price for the job. No surprises.' },
  { icon: Wrench, title: 'We build it — and stay with you', desc: 'For the first month it runs alongside your old way, so you can check it\'s right before you rely on it.' },
];

const EXAMPLES = [
  'Supplier invoices read from your email into a spreadsheet',
  'Job sheets turned into invoices on your own template',
  'Your bank statement sorted into tax-return categories for your accountant',
  'A month of social media posts, written for you to approve',
];

export const CustomWork: React.FC = () => (
  <Section id="custom" className="bg-slate-900 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent-500/5 rounded-full blur-[120px] pointer-events-none" />
    <Container className="relative z-10">
      <SectionHeading
        title={<>Got a job no app can fix? <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-blue-400">We'll build the fix.</span></>}
        subtitle="Every trade has one job that eats the evenings and no off-the-shelf software touches. Tell us yours. We look at your real paperwork, work out a fix, and build it. Priced per job."
        center
        dark
      />

      {/* Case study */}
      <FadeIn>
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 overflow-hidden mb-14">
          <div className="grid lg:grid-cols-5">
            {/* Left: the story */}
            <div className="lg:col-span-3 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="inline-block px-3 py-1 mb-5 text-xs font-bold tracking-widest text-accent-400 uppercase bg-accent-500/10 rounded-full border border-accent-500/20">
                Real example
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">D&M Fixing &amp; Joinery</h3>
              <p className="text-slate-500 text-sm mb-6">Joinery firm, Northern Ireland — schools maintenance work for a main contractor</p>

              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">The problem</p>
              <p className="text-slate-300 leading-relaxed mb-7">
                Every job arrived by email. Robert typed each one into a spreadsheet, worked out the price,
                made an invoice — then typed the whole lot again into the contractor's online system.
                Every night, after a full day on the tools.
              </p>

              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">What we built</p>
              <ul className="space-y-2.5">
                {BUILT.map(b => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                    <Check className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: the result */}
            <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-accent-500/10 to-transparent">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">The result</p>
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-8 h-8 text-accent-400" />
                <span className="text-6xl md:text-7xl font-black text-white tracking-tight">1½</span>
              </div>
              <p className="text-xl text-white font-bold mb-3">hours back, every night.</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                No more typing the same job three times. Robert checks it and approves it —
                nothing goes to the contractor or gets invoiced without his say-so.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* How custom work happens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {STEPS.map((s, i) => (
          <FadeIn key={s.title} delay={i * 80}>
            <div className="h-full rounded-2xl bg-slate-950/50 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center text-accent-400">
                  <s.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-600">{i + 1}</span>
              </div>
              <h4 className="font-bold text-white mb-2 text-sm">{s.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Examples + CTA */}
      <FadeIn delay={200}>
        <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
          <div className="flex-1">
            <p className="text-white font-bold mb-4">The kind of thing we build:</p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {EXAMPLES.map(e => (
                <li key={e} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-accent-500 flex-shrink-0">›</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-72 flex-shrink-0">
            <a href="#assessment" className="block">
              <Button variant="vibrant" fullWidth className="h-14 text-base group">
                Tell us your problem
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <p className="text-xs text-slate-500 text-center mt-3">You'll know the price before we start.</p>
          </div>
        </div>
      </FadeIn>
    </Container>
  </Section>
);
