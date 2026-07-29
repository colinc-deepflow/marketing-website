import React, { useState } from 'react';
import { TrendingUp, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { Container, Section, SectionHeading, Button, FadeIn } from './ui/Shared';

export const PricingCalculator: React.FC = () => {
  const [teamSize, setTeamSize] = useState(5);
  const [adminHours, setAdminHours] = useState(15);

  const hourlyRate = 35;
  const hoursFreed = Math.min(adminHours * 0.7, 20);
  const weeklySavings = hoursFreed * hourlyRate;
  const monthlySavings = Math.round(weeklySavings * 4.33);
  const yearlySavings = Math.round(monthlySavings * 12);

  const stats = [
    {
      label: 'Hours freed/week',
      value: hoursFreed.toFixed(1),
      sub: `~${Math.round(hoursFreed * 4.33)} per month`,
      icon: Clock,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      label: 'Monthly savings',
      value: `£${monthlySavings.toLocaleString()}`,
      sub: `Based on £${hourlyRate}/hr avg`,
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      label: 'Annual impact',
      value: `£${yearlySavings.toLocaleString()}`,
      sub: 'Year-round potential',
      icon: TrendingUp,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
    },
  ];

  return (
    <Section id="pricing" className="bg-slate-950">
      <Container>
        <SectionHeading
          title={<>See Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-blue-400">Potential Savings</span></>}
          subtitle="Drag the sliders to estimate how much time and money you could reclaim."
          center
          dark
        />

        <div className="max-w-3xl mx-auto">
          <FadeIn delay={100}>
            <div className="bg-slate-900/80 rounded-3xl border border-white/10 p-8 md:p-12">

              {/* Sliders */}
              <div className="space-y-8 mb-10">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-slate-300">Team Size</label>
                    <span className="text-sm font-bold text-accent-400">
                      {teamSize} {teamSize === 1 ? 'person' : 'people'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-accent-500"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-2">
                    <span>1 person</span>
                    <span>20 people</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-slate-300">Admin Hours / Week</label>
                    <span className="text-sm font-bold text-accent-400">{adminHours} hours</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="5"
                    value={adminHours}
                    onChange={(e) => setAdminHours(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-accent-500"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-2">
                    <span>5 hours</span>
                    <span>40 hours</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-slate-950/60 rounded-2xl border border-white/5">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.bg} border ${stat.border} ${stat.color} mb-3`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className={`text-2xl md:text-3xl font-black ${stat.color} mb-0.5 tabular-nums`}>
                      {stat.value}
                    </div>
                    <div className="text-slate-500 text-xs font-medium">{stat.label}</div>
                    <div className="text-slate-700 text-xs mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-700 text-center mb-4 leading-relaxed">
                *Based on a typical 70% reduction in admin time. Actual savings may vary. Figures in GBP.
              </p>

              <div className="text-center mb-5">
                <p className="text-slate-500 text-xs">
                  One plan, everything included —{' '}
                  <strong className="text-slate-400">£200/month</strong>, no setup fee.
                  Our first 5 businesses pay <strong className="text-amber-400/80">£150/month, locked for life</strong>.
                </p>
              </div>

              <a href="#assessment" className="block">
                <Button variant="vibrant" fullWidth className="h-14 text-base">
                  Get Started — Free Assessment
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
