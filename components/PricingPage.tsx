import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Container } from './ui/Shared';

// ── The 5 core automations every client can access ────────────────────────────
const CORE_FIVE = [
  { name: 'Lead follow-up',       desc: 'Responds to every new enquiry automatically — within minutes, not hours.' },
  { name: 'Quote reminder',       desc: 'Chases unanswered quotes so you stop losing jobs to competitors who followed up.' },
  { name: 'Invoice chaser',       desc: 'Professionally escalating payment reminders at 7, 14 and 30 days. No awkward calls.' },
  { name: 'Appointment reminder', desc: 'Sends 48-hour and 2-hour reminders before every job. No-shows drop off fast.' },
  { name: 'Review request',       desc: 'Asks for a Google review 24 hours after every completed job, at the perfect moment.' },
];

// ── Trade-specific extras ─────────────────────────────────────────────────────
const TRADE_EXTRAS: Record<string, string[]> = {
  'Plumber':           ['Emergency callout response', 'No-show follow-up', 'Annual landlord check reminder', 'New enquiry SMS alert', 'Lapsed customer win-back'],
  'Gas Engineer':      ['Emergency callout response', 'Annual boiler service reminder', 'Pre-winter seasonal outreach', 'Insurance/membership renewal alert', 'Gas Safe renewal reminder'],
  'Electrician':       ['Emergency callout response', 'Big job nurture (rewires/EV chargers)', 'NICEIC/NAPIT renewal reminder', 'Insurance/membership renewal alert', 'New enquiry SMS alert'],
  'Builder':           ['Big job nurture (extensions)', 'No-show follow-up', 'Guarantee check-in', 'Lapsed customer win-back', 'Weekly timesheet chaser'],
  'Roofer':            ['Pre-winter seasonal outreach', 'Big quote nurture', 'Emergency callout response', 'No-show follow-up', 'Guarantee check-in'],
  'Joiner':            ['Big job nurture', 'Guarantee check-in', 'Referral trigger', 'Lapsed customer win-back', 'Silent customer alert'],
  'Painter/Decorator': ['Spring/Christmas seasonal outreach', 'Big job nurture', 'Referral trigger', 'Lapsed customer win-back', 'Silent customer alert'],
  'Landscaper':        ['Spring booking rush outreach', 'Annual maintenance reminder', 'Big project nurture', 'Referral trigger', 'Lapsed customer win-back'],
};

const TIERS = [
  {
    key:        'starter',
    name:       'Starter',
    tagline:    'The smartest way to begin',
    desc:       'Pick any 3 from the 5 core automations. We set them up, you see results straight away.',
    setup:      149,
    monthly:    79,
    annualMo:   66,
    count:      '3 of 5',
    countLabel: 'core automations (your choice)',
    highlight:  false,
    badge:      null,
  },
  {
    key:        'core',
    name:       'Core',
    tagline:    'The full core package',
    desc:       'All 5 core automations running together. The complete foundation for any trades business.',
    setup:      299,
    monthly:    127,
    annualMo:   106,
    count:      '5',
    countLabel: 'core automations — all included',
    highlight:  false,
    badge:      null,
  },
  {
    key:        'trade',
    name:       'Trade Pro',
    tagline:    'Built for your trade, top to bottom',
    desc:       'Everything in Core, plus 5 automations pre-configured specifically for your trade. The works.',
    setup:      499,
    monthly:    197,
    annualMo:   164,
    count:      '10',
    countLabel: '5 core + 5 trade-specific',
    highlight:  true,
    badge:      'Most popular',
  },
];

// ── Trade extras accordion ────────────────────────────────────────────────────
function TradeExtras() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-2">
      {Object.entries(TRADE_EXTRAS).map(([trade, extras]) => (
        <div key={trade} className="border border-white/10 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === trade ? null : trade)}
            className="w-full flex items-center justify-between px-5 py-3.5 text-left text-sm text-slate-300 hover:text-white hover:bg-white/4 transition-colors"
          >
            <span className="font-medium">{trade}</span>
            {open === trade
              ? <ChevronUp className="w-4 h-4 text-slate-500" />
              : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>
          {open === trade && (
            <div className="px-5 pb-4 bg-slate-900/40">
              <ul className="space-y-1.5 pt-1">
                {extras.map((e, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="text-accent-500 mt-0.5 flex-shrink-0">›</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export const PricingPage: React.FC = () => (
  <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent-600/6 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

    <Container className="relative z-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <div className="h-px w-14 bg-gradient-to-r from-accent-500 to-blue-500 mb-8" />
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
            Start simple.<br className="hidden sm:block" /> Grow with us.
          </h1>
          <p className="text-xl text-slate-300 font-light mb-4 leading-relaxed">
            Every client starts with 3 core automations — the ones that make the biggest difference on day one.
            Add more when the business is ready.
          </p>
          <p className="text-slate-400 leading-relaxed">
            We set everything up, we keep it running, and we're here when you want to go further. No pressure, no upsell calls — you'll know when it's time.
          </p>
        </div>

        {/* ROI callout */}
        <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-2xl px-8 py-5 mb-10">
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-emerald-400">The average tradesperson loses 10+ hours a week to admin.</strong>{' '}
            At £35/hr that's <strong className="text-white">£16,800 a year</strong> going on chasing quotes,
            invoices and no-shows. The Starter package costs <strong className="text-white">£948/year</strong> and handles the worst of it from week one.
            That's a <strong className="text-emerald-400">17× return.</strong>
          </p>
        </div>

        {/* Tiers */}
        <div className="space-y-5 mb-8">
          {TIERS.map((tier) => (
            <div
              key={tier.key}
              className={`rounded-2xl p-8 border transition-all duration-300 ${
                tier.highlight
                  ? 'bg-accent-500/8 border-accent-500/30'
                  : 'bg-slate-900/60 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-bold text-white">{tier.name}</h2>
                    {tier.badge && (
                      <span className="text-xs font-bold text-accent-400 bg-accent-500/15 border border-accent-500/30 px-2.5 py-0.5 rounded-full">
                        {tier.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs">{tier.tagline}</p>
                </div>
                <div className="text-right shrink-0">
                  <div>
                    <span className="text-2xl font-extrabold text-white">£{tier.monthly}</span>
                    <span className="text-slate-500 text-sm"> / month</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">£{tier.setup} one-time setup</p>
                  <p className="text-emerald-500 text-xs mt-0.5">£{tier.annualMo}/mo paid annually</p>
                </div>
              </div>

              {/* Automation count badge */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-800/60 border border-white/8 px-3 py-1.5 rounded-full uppercase tracking-wider">
                  <span className="text-white">{tier.count}</span> {tier.countLabel}
                </span>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed">{tier.desc}</p>
            </div>
          ))}
        </div>

        {/* Annual saving */}
        <div className="bg-slate-900/40 border border-white/8 rounded-2xl px-8 py-5 mb-10">
          <p className="text-slate-400 text-sm">
            <strong className="text-slate-300">Pay annually and get 2 months free</strong> — Trade Pro drops to £164/month (£1,968/year + setup). Works on all plans.
          </p>
        </div>

        {/* The 5 core automations */}
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 mb-5">
          <p className="text-white font-bold text-base mb-1">The 5 core automations</p>
          <p className="text-slate-500 text-xs mb-6">
            Starter clients pick any 3. Core and Trade Pro get all 5.
          </p>
          <ul className="space-y-5">
            {CORE_FIVE.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-slate-200 text-sm font-semibold">{a.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{a.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Trade Pro extras */}
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 mb-5">
          <p className="text-white font-bold text-base mb-1">Trade Pro — what's included for your trade</p>
          <p className="text-slate-500 text-xs mb-5">
            In addition to all 5 core automations, Trade Pro adds 5 pre-configured for how your specific trade actually works.
          </p>
          <TradeExtras />
        </div>

        {/* How it works */}
        <div className="bg-slate-900/40 border border-white/8 rounded-2xl p-8 mb-5">
          <p className="text-white font-bold text-base mb-5">How it works</p>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Fill in the form', desc: "Takes 2 minutes. Tell us your trade and what's slowing you down." },
              { step: '2', title: 'We build it for you', desc: 'No software to learn, no setup on your end. Everything is ready in 2–3 days.' },
              { step: '3', title: 'It runs in the background', desc: "Automations fire when they're supposed to. You focus on the work." },
              { step: '4', title: "Add more when you're ready", desc: "As your business grows, more automations become relevant. We're here when that day comes." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-accent-500/15 border border-accent-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-accent-400">{s.step}</span>
                </div>
                <div>
                  <p className="text-slate-200 text-sm font-semibold">{s.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom */}
        <div className="bg-slate-900/40 border border-white/8 rounded-2xl px-8 py-6">
          <p className="text-white font-bold text-base mb-2">Need something different?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            Larger teams, unusual setups, or custom integrations — we can build it.
            Get in touch and we'll put together a quote.
          </p>
          <a
            href="#assessment"
            className="text-accent-400 hover:text-accent-300 underline text-sm font-semibold transition-colors"
          >
            Get a free assessment →
          </a>
        </div>

      </div>
    </Container>
  </div>
);
