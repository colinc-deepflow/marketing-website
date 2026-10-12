import React from 'react';
import {
  Clock, PhoneMissed, FileText,
  CheckCircle2, Workflow, Bot, ArrowDown,
  Search, PenTool, LayoutDashboard,
} from 'lucide-react';
import { Container, Section, SectionHeading, FeatureCard, FadeIn } from './ui/Shared';

export const Problem: React.FC = () => {
  return (
    <Section className="bg-slate-900">
      <Container>
        <SectionHeading
          title={<>The <span className="text-accent-400">second shift</span> nobody pays you for</>}
          subtitle="You finish on site, get home, and start again — replying, pricing, chasing. You didn't start a trade to spend your evenings at the kitchen table."
          center
          dark
        />
        <div className="grid md:grid-cols-3 gap-5">
          <FadeIn delay={0}>
            <FeatureCard
              icon={PhoneMissed}
              title="Enquiries go cold"
              description="You're up a ladder when they get in touch. By the time you reply that night, they've booked whoever answered first."
            />
          </FadeIn>
          <FadeIn delay={100}>
            <FeatureCard
              icon={FileText}
              title="Quotes go quiet"
              description="You send the price and hear nothing. You mean to chase it, but you're busy — and it feels awkward. So the job slips away."
            />
          </FadeIn>
          <FadeIn delay={200}>
            <FeatureCard
              icon={Clock}
              title="Your money sits in their bank"
              description="The job's done but the invoice isn't sent, or it's sent and nobody chases it. You're owed thousands and you're the one waiting."
            />
          </FadeIn>
        </div>
        <FadeIn delay={300}>
          <p className="text-center text-slate-300 text-lg md:text-xl mt-12 max-w-2xl mx-auto leading-relaxed">
            An hour and a half a night is <span className="text-white font-bold">over seven hours a week</span> —
            a full working day you're not paid for.{' '}
            <span className="text-accent-400 font-semibold">That's the day we give you back.</span>
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
};

export const Solution: React.FC = () => {
  const steps = [
    {
      title: '1. Tell us how you work',
      desc: 'Fill in the form or have a quick chat. We set everything up for you — your details, your bank details, your review link, and how your messages should sound. No software to learn.',
      icon: Search,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      title: '2. It writes and chases for you',
      desc: 'Replies to enquiries, quotes, booking reminders, invoices and payment chasers are written in your words, at the right time. It watches for replies and keeps after anyone who goes quiet.',
      icon: PenTool,
      color: 'text-accent-400',
      bg: 'bg-accent-500/10',
      border: 'border-accent-500/20',
    },
    {
      title: '3. You tap OK',
      desc: 'Everything lands on your phone first. Read it, change it if you like, tap approve. Nothing reaches a customer until you say so.',
      icon: LayoutDashboard,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
    },
  ];

  return (
    <Section id="how-it-works" className="bg-slate-950 overflow-hidden">
      {/* Blueprint grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left: copy */}
          <div>
            <FadeIn>
              <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-accent-400 uppercase bg-accent-500/10 rounded-full border border-accent-500/20">
                How it works
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                You do the work.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-blue-400">
                  We do the rest.
                </span>
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light">
                Think of it as an office manager who never forgets to chase anyone — and never sends a thing without asking you first.
              </p>
            </FadeIn>

            <div className="space-y-7">
              {steps.map((step, idx) => (
                <FadeIn key={idx} delay={idx * 100}>
                  <div className="flex gap-5 group">
                    <div className="flex-shrink-0">
                      <div className={`h-11 w-11 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center ${step.color} transition-all duration-300 group-hover:scale-110`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base mb-1.5">{step.title}</h4>
                      <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right: workflow mockup */}
          <div className="relative mt-10 lg:mt-0">
            <FadeIn delay={200}>
              <div className="relative bg-slate-900/80 rounded-3xl p-8 border border-white/10 shadow-2xl">
                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-56 h-56 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-center mb-5">
                    <div className="bg-accent-500/10 text-accent-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-accent-500/20">
                      On your phone
                    </div>
                  </div>

                  {/* Row 1 */}
                  <div className="bg-slate-800/60 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">New enquiry — kitchen fit</div>
                        <div className="text-xs text-slate-500">Your enquiry page · Just now</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                      Reply written
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <ArrowDown className="text-slate-700 w-4 h-4 animate-bounce" />
                  </div>

                  {/* Row 2 — highlighted */}
                  <div className="bg-slate-800/80 p-4 rounded-2xl border border-accent-500/30 ring-1 ring-accent-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-accent-500/10 p-2 rounded-lg text-accent-400">
                        <Workflow className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">Quote — no reply in 2 days</div>
                        <div className="text-xs text-slate-500">Follow-up written for you</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
                      Tap to approve
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <ArrowDown className="text-slate-700 w-4 h-4" />
                  </div>

                  {/* Row 3 — queued */}
                  <div className="bg-slate-800/30 p-4 rounded-2xl border border-white/5 flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-700/50 p-2 rounded-lg text-slate-500">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-slate-300 font-medium text-sm">Invoice £850 — 7 days</div>
                        <div className="text-xs text-slate-600">Polite reminder lined up</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-700/40 text-slate-500 rounded-full border border-white/5">
                      Next
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
};
