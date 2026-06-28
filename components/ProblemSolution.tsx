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
          title={<>The <span className="text-accent-400">Admin Trap</span></>}
          subtitle="You didn't start a trades business to spend your evenings sending emails."
          center
          dark
        />
        <div className="grid md:grid-cols-3 gap-5">
          <FadeIn delay={0}>
            <FeatureCard
              icon={PhoneMissed}
              title="Missed Enquiries"
              description="When you're on site, messages pile up. By the time you reply, the job's gone. Work lost simply because the response came too late."
            />
          </FadeIn>
          <FadeIn delay={100}>
            <FeatureCard
              icon={FileText}
              title="Quotes Stack Up"
              description="You have the details but typing up quotes takes hours. The backlog grows every week and urgent jobs get lost in the pile."
            />
          </FadeIn>
          <FadeIn delay={200}>
            <FeatureCard
              icon={Clock}
              title="Late Nights"
              description="After a full day on the tools you spend your evening handling admin — work you shouldn't have to do at all."
            />
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
};

export const Solution: React.FC = () => {
  const steps = [
    {
      title: 'Discovery & Mapping',
      desc: 'We run an AI audit of your business — mapping where your time goes, where jobs stall, and where money slips through the cracks.',
      icon: Search,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      title: 'Custom Build',
      desc: 'We design a bespoke automation system using AI that mirrors and improves your existing process.',
      icon: PenTool,
      color: 'text-accent-400',
      bg: 'bg-accent-500/10',
      border: 'border-accent-500/20',
    },
    {
      title: 'Deploy & Control',
      desc: 'You get a simple dashboard to oversee everything. The system runs the admin; you keep control.',
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
                Our Process
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                We Engineer Your<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-blue-400">
                  Ideal Workflow.
                </span>
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light">
                Not a one-size-fits-all app. A consulting and build service. We learn exactly how you run your business, then build automation to match.
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
                      System Logic
                    </div>
                  </div>

                  {/* Row 1 */}
                  <div className="bg-slate-800/60 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">New Enquiry</div>
                        <div className="text-xs text-slate-500">Website form · Just now</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                      Auto-Logged
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
                        <div className="text-white font-semibold text-sm">Draft Quote</div>
                        <div className="text-xs text-slate-500">Using client job details</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
                      Drafted
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
                        <div className="text-slate-300 font-medium text-sm">Follow-up Scheduled</div>
                        <div className="text-xs text-slate-600">If no reply in 3 days</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-700/40 text-slate-500 rounded-full border border-white/5">
                      Queued
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
