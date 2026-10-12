import React, { useState } from 'react';
import { Clock, PoundSterling, CalendarDays, ArrowRight } from 'lucide-react';
import { Container, Section, SectionHeading, Button, FadeIn } from './ui/Shared';

// ============================================================================
// "What's the admin costing you?" — rewritten 11 Oct 2026.
//
// The old version claimed "a typical 70% reduction in admin time". Nothing
// backs that number, so it is gone. This version only multiplies the visitor's
// OWN two numbers: the hours they spend and what their hour is worth. It shows
// what the admin costs them today — it does not promise how much we save.
// ============================================================================

interface PricingCalculatorProps {
  /** Takes the visitor to the pricing page. Optional so the component still
   *  renders standalone — it just hides the link if no handler is given. */
  onSeePricing?: () => void;
}

const PLAN_MONTHLY = 69;
const WEEKS_PER_MONTH = 52 / 12;

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onSeePricing }) => {
  const [adminHours, setAdminHours] = useState(7);
  const [hourlyRate, setHourlyRate] = useState(35);

  const monthlyCost = Math.round(adminHours * hourlyRate * WEEKS_PER_MONTH);
  const yearlyHours = adminHours * 52;
  const workingDays = Math.round(yearlyHours / 8);

  const stats = [
    {
      label: 'Hours a year on admin',
      value: yearlyHours.toLocaleString(),
      sub: `That's about ${workingDays} full working days`,
      icon: CalendarDays,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      label: 'What that costs you a month',
      value: `£${monthlyCost.toLocaleString()}`,
      sub: `At £${hourlyRate} an hour`,
      icon: PoundSterling,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
    },
    {
      label: 'The DeepFlow plan',
      value: `£${PLAN_MONTHLY}`,
      sub: 'a month, cancel anytime',
      icon: Clock,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
  ];

  return (
    <Section id="pricing" className="bg-slate-950">
      <Container>
        <SectionHeading
          title={<>What's the admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-blue-400">costing you?</span></>}
          subtitle="Move the sliders. These are your numbers — we don't fill in any guesses."
          center
          dark
        />

        <div className="max-w-3xl mx-auto">
          <FadeIn delay={100}>
            <div className="bg-slate-900/80 rounded-3xl border border-white/10 p-8 md:p-12">

              <div className="space-y-8 mb-10">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-slate-300">Hours a week on admin</label>
                    <span className="text-sm font-bold text-accent-400">{adminHours} {adminHours === 1 ? 'hour' : 'hours'}</span>
                  </div>
                  <input
                    type="range" min="1" max="20" value={adminHours}
                    onChange={(e) => setAdminHours(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-accent-500"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-2">
                    <span>1 hour</span><span>20 hours</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">Replying, pricing, chasing, invoicing, reminding. An hour and a half a night, five nights, is 7½.</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-slate-300">What an hour of your time is worth</label>
                    <span className="text-sm font-bold text-accent-400">£{hourlyRate}</span>
                  </div>
                  <input
                    type="range" min="20" max="80" step="5" value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-accent-500"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-2">
                    <span>£20</span><span>£80</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-6 bg-slate-950/60 rounded-2xl border border-white/5">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.bg} border ${stat.border} ${stat.color} mb-3`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className={`text-2xl md:text-3xl font-black ${stat.color} mb-0.5 tabular-nums`}>{stat.value}</div>
                    <div className="text-slate-400 text-xs font-medium">{stat.label}</div>
                    <div className="text-slate-600 text-xs mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-slate-400 text-center mb-6 leading-relaxed">
                If it wins you back one job that would have gone cold, or gets one invoice paid a few weeks sooner,
                it has paid for itself.
                {onSeePricing && (
                  <>
                    {' '}
                    <button type="button" onClick={onSeePricing} className="text-accent-400 hover:text-accent-300 underline underline-offset-2">
                      See pricing
                    </button>
                  </>
                )}
              </p>

              <a href="#assessment" className="block">
                <Button variant="vibrant" fullWidth className="h-14 text-base">
                  Get your evenings back
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
};
